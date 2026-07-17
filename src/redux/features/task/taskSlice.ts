import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

interface InitialState {
    tasks: ITask[];
    filter: "all" | "high" | "medium" | "low";
}

const initialState:InitialState = {
    tasks: [],
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
        }
    }
})

export const selectTasks = (state: RootState) => {
    return state.todo.tasks;
}

export const filterTasks = (state: RootState) => {
    return state.todo.filter;
}

export const {addTask} = taskSlice.actions
export default taskSlice.reducer;