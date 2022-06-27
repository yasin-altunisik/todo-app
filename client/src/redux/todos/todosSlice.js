import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`)
    return res.data
})

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data)
    return res.data
})

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async ({ id, data }) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data)
    return res.data
})

export const removeTodoAsync = createAsyncThunk("todos/removeTodoAsync", async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`)
    return res.data
})

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: "all",
        addNewTodo: {
            isLoading: false,
            error: null
        }
    },
    reducers: {
        changeActiveFilter(state, action) {
            state.activeFilter = action.payload;
        },
        clearCompleted(state, action) {
            const filtered = state.items.filter((item) => item.completed !== true)
            state.items = filtered
        }
    },
    extraReducers: {
        //get todos
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        //add todos
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodo.isLoading = true
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload)
            state.addNewTodo.isLoading = false
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodo.isLoading = false;
            state.addNewTodo.error = action.error.message;
        },
        //toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload;
            const index = state.items.findIndex((item) => item.id === id)
            state.items[index].completed = completed
        },
        //remove todo
        [removeTodoAsync.fulfilled]: (state, action) => {
            state.items = action.payload
        }
    }
})

export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === "all") {
        return state.todos.items
    }

    return state.todos.items.filter((todo) => state.todos.activeFilter === "active" ? todo.completed === false : todo.completed === true)

}
export const selectTodos = (state) => state.todos.items
export const selectActiveFilter = (state) => state.todos.activeFilter
export const { filter, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;