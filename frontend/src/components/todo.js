import React, { useEffect, useRef, useState } from "react";

function Todo({ todo, onDescription, onDelete, onAdvance }) {
  const [showDelete, addShowDelete] = useState(false);

  return (
    <div key={todo.id} className="todo-card">
      <h3 className="description">{todo.description}</h3>
      <div className="buttons">
        <button className="button glow-on-hover" onClick={onDescription}>
          Description
        </button>

        <button
          className="button glow-on-hover"
          onClick={() => onAdvance(todo)}
        >
          Advance
        </button>

        <div className="btn">
          {showDelete && (
            <div className="btn-back">
              <p>Are you sure you want to do that?</p>
              <button className="yes" onClick={() => onDelete(todo)}>
                Yes
              </button>
              <button className="no" onClick={() => addShowDelete(false)}>
                No
              </button>
            </div>
          )}
          <div className="btn-front" onClick={() => addShowDelete(true)}>
            X
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
