import {useState} from "react";

import {useDispatch} from "react-redux"
import {addTodoItem} from "../redux/todos/todosSlice"

function Form() {
    const [title, setTitle] = useState("")
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(title === ""){
            return window.alert("to-do section shold not be empty")
        }
        dispatch(addTodoItem({ title }))
        setTitle("")
    }

    return (
        <form onSubmit={handleSubmit} >
            <input className="new-todo" placeholder="What needs to be done?" autoFocus value={title} onChange={(e)=>setTitle(e.target.value) } />
        </form>
    )
}

export default Form