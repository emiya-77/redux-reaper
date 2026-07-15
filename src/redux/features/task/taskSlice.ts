import type { ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    task: ITask[];
}

const initialState:InitialState = {
    task: [
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
            priority: "High",
        }
    ]
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {

    }
})

// export {} = taskSlice.actions
export default taskSlice.reducer;