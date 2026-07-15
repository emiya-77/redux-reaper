import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

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

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {

    }
})

export const selectTasks = (state: RootState) => {
    return state.todo.tasks;
}

export const filterTasks = (state: RootState) => {
    return state.todo.filter;
}

// export {} = taskSlice.actions
export default taskSlice.reducer;