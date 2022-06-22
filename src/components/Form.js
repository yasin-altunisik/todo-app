import {useState} from "react";

import {useDispatch} from "react-redux"
import {addTodoItem} from "../redux/todos/todosSlice"

function Form() {
    const [inputText, setInputText] = useState("")
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputText)
        dispatch(addTodoItem)
    }

    return (
        <form onSubmit={handleSubmit} >
            <input className="new-todo" placeholder="What needs to be done?" autoFocus value={inputText} onChange={(e) =>setInputText(e.target.value) } />
        </form>
    )
}

export default Form