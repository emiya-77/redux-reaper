import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

interface InitialState {
    tasks: ITask[];
    filter: "all" | "high" | "medium" | "low";
}

const initialState:InitialState = {
    tasks: [
        {
            id: "asdfasdfasdf",
            title: "Initialize frontend",
            description: "Create home page, and routing",
            dueDate: new Date("2026-11-02"),
            isComplete: false,
            priority: "high",
            assignedTo: "yqmNdM4MNDOMv1Pa4cJ5C",
        },
        {
            id: "dlkjlkjlksjd",
            title: "Create github repo",
            description: "Create github repo, and actions",
            dueDate: new Date("2026-11"),
            isComplete: false,
            priority: "medium",
            assignedTo: "",
        }
    ],
    filter: "all",
}

type DraftTask = Pick<ITask, "title" | "description" | "priority" | "dueDate">;

const createTask = (taskData: DraftTask) : ITask => {
    return {
        id: nanoid(),
        isComplete: false,
        ...taskData
    };
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action : PayloadAction<DraftTask>) => {
            const taskData = createTask(action.payload)
            state.tasks.push(taskData);
        },
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            state.tasks.forEach((task) => 
                task.id === action.payload 
                ? task.isComplete = !task.isComplete
                : task
            )
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            // 1st Method:
            // state.tasks.forEach((task, idx) => 
            //     task.id === action.payload.id
            //     ? state.tasks[idx] = {...task, ...action.payload}
            //     : task
            // )

            // 2nd Method:
            const task = state.tasks.find((task) => task.id === action.payload.id);

            if(task){
                Object.assign(task, action.payload);
            }
        },
        updateFilter: (state, action: PayloadAction<"all" | "high" | "medium" | "low">) => {
            state.filter = action.payload;
        }
    }
})

export const selectTasks = (state: RootState) => {
    const filter = state.todo.filter;

    if(filter === "low"){
        return state.todo.tasks.filter((task) => task.priority === "low");
    }else if (filter === "medium"){
        return state.todo.tasks.filter((task) => task.priority === "medium");
    }else if (filter === "high"){
        return state.todo.tasks.filter((task) => task.priority === "high");
    }else{
        return state.todo.tasks;
    }
}

export const filterTasks = (state: RootState) => {
    return state.todo.filter;
}

export const {
    addTask, 
    toggleCompleteState, 
    deleteTask,
    updateTask,
    updateFilter,
} = taskSlice.actions
export default taskSlice.reducer;