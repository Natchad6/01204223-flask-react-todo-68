import { useState } from 'react'
import './App.css'

function TodoItem({ todo, toggleDone, deleteTodo, addNewComment }) {
  const [newComment, setNewComment] = useState("");
  return (
    <li>
      2 Pun
      <span className={todo.done ? "done" : ""}>{todo.title}</span>
      <button onClick={() => { toggleDone(todo.id) }}>Toggle</button>
      <button onClick={() => { deleteTodo(todo.id) }}>❌</button>
      {todo.comments.length === 0 && <span>No Comments</span>}
      {(todo.comments) && (todo.comments.length > 0) && (
        <>
          <b>Comments:</b>
          <ul>
            {todo.comments.map(comment => (
              <li key={comment.id}>{comment.message}</li>
            ))}
          </ul>
        </>
      )}

      <div className="new-comment-forms">
        <input
          type="text"
          value={newComment}
          onChange={(e) => {
            const value = e.target.value;
            setNewComment(value);
          }}
        />
        <button onClick={() => {
          addNewComment(todo.id, newComment);
          setNewComment("");
        }}>Add Comment</button>
      </div>

    </li>
  )
}
export default TodoItem