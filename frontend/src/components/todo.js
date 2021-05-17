import React, { useEffect, useRef } from "react";

function Todo({ todo, onDescription, onDelete, onAdvance }) {
  const btnDeleteRef = useRef(null);

  function distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  useEffect(() => {
    const btn = btnDeleteRef.current.querySelector(".btn");

    const btnFront = btn.querySelector(".btn-front"),
      btnYes = btn.querySelector(".btn-back .yes"),
      btnNo = btn.querySelector(".btn-back .no");

    btnFront.addEventListener("click", function (event) {
      const mx = event.clientX - btn.offsetLeft,
        my = event.clientY - btn.offsetTop;

      const w = btn.offsetWidth,
        h = btn.offsetHeight;

      const directions = [
        { id: "top", x: w / 2, y: 0 },
        { id: "right", x: w, y: h / 2 },
        { id: "bottom", x: w / 2, y: h },
        { id: "left", x: 0, y: h / 2 },
      ];

      directions.sort(function (a, b) {
        return distance(mx, my, a.x, a.y) - distance(mx, my, b.x, b.y);
      });

      btn.setAttribute("data-direction", directions.shift().id);
      btn.classList.add("is-open");
    });

    btnYes.addEventListener("click", function (event) {
      btn.classList.remove("is-open");
    });

    btnNo.addEventListener("click", function (event) {
      btn.classList.remove("is-open");
    });
  }, []);

  return (
    <div key={todo.id} className="todo-card">
      <h3>{todo.description}</h3>
      <div class="buttons" ref={btnDeleteRef}>
        <button className="button glow-on-hover" onClick={onDescription}>
          Description
        </button>

        <button
          className="button glow-on-hover"
          onClick={() => onAdvance(todo)}
        >
          Advance
        </button>

        {/*<button onClick={() => onDelete(todo)}>Delete</button>*/}
        <div className="btn">
          <div className="btn-back">
            <p>Are you sure you want to do that?</p>
            <button className="yes" onClick={() => onDelete(todo)}>
              Yes
            </button>
            <button className="no">No</button>
          </div>
          <div className="btn-front">X</div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
