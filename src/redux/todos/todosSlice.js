import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [
            {
                id: "1",
                title: "read book",
                completed: true
            },
            {
                id: "2",
                title: "sleep",
                completed: false
            }
        ],
    },
    reducers: {
        addTodoItem(action, payload){
            state.items.push({id:"3", title: "adam ol", completed: false})
        }
    }
})

export const {addTodoItem} = todosSlice.actions;
export default todosSlice.reducer;