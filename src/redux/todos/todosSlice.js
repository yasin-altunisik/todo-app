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
        addTodoItem(state, action) {
            state.items.push(action.payload)
        },
        toggle(state, action) {
            const { id } = action.payload
            const item = state.items.find((item) => item.id === id)
            item.completed = !item.completed
        },
        destroy(state, action) {
            const id = action.payload
            const filtered = state.items.filter((item) => item.id !== id)
            state.items = filtered
        },
        filter(state, action) {
            if(action.payload === "active"){
                const active = state.items.filter((item)=>item.completed !== true)
                state.items = active
            }else if(action.payload === "completed"){
                const completed = state.items.filter((item)=>item.completed === true)
                state.items = completed                
            }
        }
    }
})

export const { addTodoItem, toggle, destroy, filter } = todosSlice.actions;
export default todosSlice.reducer;