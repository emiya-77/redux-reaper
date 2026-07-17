import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

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
            dueDate: "2026-11",
            isComplete: false,
            priority: "High",
        },
        {
            id: "dlkjlkjlksjd",
            title: "Create github repo",
            description: "Create github repo, and actions",
            dueDate: "2026-11",
            isComplete: false,
            priority: "Medium",
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
        }
    }
})

export const selectTasks = (state: RootState) => {
    return state.todo.tasks;
}

export const filterTasks = (state: RootState) => {
    return state.todo.filter;
}

export const {addTask, toggleCompleteState, deleteTask} = taskSlice.actions
export default taskSlice.reducer;