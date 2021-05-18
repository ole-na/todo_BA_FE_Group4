import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";

function Todo({ todo, onDescription, onDelete, onAdvance }) {
  const [showDelete, addShowDelete] = useState(false);

  const DeleteBtn = styled.div`
    display: block;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 200px;
    height: 103px;
    transition: width 0.8s cubic-bezier(0.23, 1, 0.32, 1),
      height 0.8s cubic-bezier(0.23, 1, 0.32, 1),
      transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    text-align: center;
  `;

  const DialogDeleteBtn = styled.div`
    border-radius: 10px;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #eee;
    color: #222;
    overflow: hidden;
    transition: box-shadow 0.8s ease;
    z-index: 1;

    p {
      margin-top: 7px;
      margin-bottom: 7px;
    }

    button {
      padding: 12px 20px;
      margin: 0 5px;
      background-color: transparent;
      border: 0;
      border-radius: 10px;
      font-size: 1em;
      cursor: pointer;
      -webkit-appearance: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      transition: background 0.15s ease;

      :focus {
        outline: 0;
      }

      :hover {
        background-color: #ddd;
      }
    }

    .yes {
      background-color: darkred;
      color: #fff;
    }

    .no {
      color: darkred;
    }
  `;

  const DeleteIconBtn = styled.div`
    border-radius: 1.5em;
    position: absolute;
    display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: darkred;
    color: #fff;
    cursor: pointer;
    backface-visibility: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transition: background 0.15s ease,
      line-height 0.8s cubic-bezier(0.23, 1, 0.32, 1);

    :hover {
      background-color: red;
    }
  `;

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

        <DeleteBtn>
          {showDelete && (
            <DialogDeleteBtn>
              <p>Are you sure you want to do that?</p>
              <button className="yes" onClick={() => onDelete(todo)}>
                Yes
              </button>
              <button className="no" onClick={() => addShowDelete(false)}>
                No
              </button>
            </DialogDeleteBtn>
          )}
          <DeleteIconBtn onClick={() => addShowDelete(true)}>X</DeleteIconBtn>
        </DeleteBtn>
      </div>
    </div>
  );
}

export default Todo;
