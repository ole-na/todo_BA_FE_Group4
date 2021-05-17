import axios from "axios";

export function getTodos() {
  return axios.get("api/todo").then((response) => {
    return response.data;
  });
}

export function postTodo(newTodoDto) {
  return axios.post("api/todo", newTodoDto).then((response) => {
    return response.data;
  });
}

export function deleteTodo(todo) {
  return axios.delete("api/todo/" + todo.id);
}

export function getTodo(todo) {
  return axios.get("api/todo/" + todo.id).then((response) => {
    return response.data;
  });
}

export function putTodo(todo) {
  return axios.put("api/todo/" + todo.id, todo).then((response) => {
    return response.data;
  });
}
