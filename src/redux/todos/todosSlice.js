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
        activeFilter: "all"
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
        changeActiveFilter(state, action) {
            state.activeFilter = action.payload;
        },
        clearCompleted(state, action){
            const filtered = state.items.filter((item)=>item.completed !== true)
            state.items = filtered
        }
    }
})

export const selectTodos = (state) => state.todos.items
export const selectActiveFilter = (state)=>state.todos.activeFilter
export const { addTodoItem, toggle, destroy, filter, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;