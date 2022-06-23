import React from "react"

import {useSelector, useDispatch} from "react-redux"
import {filter} from "../redux/todos/todosSlice"

function ContentFooter() {

  const items = useSelector((state)=>state.todos.items)
  const itemsLeft = items.filter((item)=>!item.completed).length
  const dispatch = useDispatch()

    return (
        <footer className="footer">
        <span className="todo-count">
          <strong>{itemsLeft}</strong>{" "}
          {(itemsLeft > 1) ? "items" : "item"} left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>
          <li>
            <a href="#/" onClick={()=>dispatch(filter("active"))}>Active</a>
          </li>
          <li>
            <a href="#/" onClick={()=>dispatch(filter("completed"))} >Completed</a>
          </li>
        </ul>

        <button className="clear-completed">
          Clear completed
        </button>
      </footer>
    )
}

export default ContentFooter