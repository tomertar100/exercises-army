import axios from "axios";
import { Todo } from "../src/App";

type LoginToServer = (username: string, password: string) => any;
type registerToServer = (username: string, password: string) => any;

const sessionStorageObject = "JWT";
const serverUrl = "http://localhost:3002/";

const getConfig = () => {
  return {
    headers: {
      authorization: `bearer ${sessionStorage.getItem(sessionStorageObject)}`,
      "Content-Type": "application/json",
    },
  };
};

export const errorHandling = (error: any) => {
  if (error.response) {
    // server responded
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);

    return error.response;
  } else if (error.request) {
    // no response
    console.log(error.request);
  } else {
    // something happened in the middle
    console.log("Error", error.message);
  }
};

export const setSessionStorageToken = (jwt: string) => {
  sessionStorage.setItem(sessionStorageObject, jwt);
};

export const loginToServer: LoginToServer = async (username, password) => {
  const data = JSON.stringify({
    username: username,
    password: password,
  });
  return await axios
    .post(serverUrl + "login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch(errorHandling);
};

export const registerToServer: registerToServer = async (
  username,
  password
) => {
  const data = JSON.stringify({
    username: username,
    password: password,
  });

  return await axios
    .post(serverUrl + "register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch(errorHandling);
};

axios.defaults.baseURL = serverUrl;

//todos axios request

//get all the todos from server

export const getEverything = async (token: string | null) => {
  return await axios
    .get(serverUrl + "/todoapp/alltodos", {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(errorHandling);
};

//get todos from server based on user_id

export const getTodos = async (
  user_id: string | null,
  token: string | null
) => {
  return await axios
    .get(serverUrl + `todoapp/todos/${user_id}`, {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(errorHandling);
};

//create todo

export const createTodo = async (
  task_id: string | null,
  user_id: number | string | null,
  text: string,
  date: string,
  completed: boolean,
  overdue: boolean,
  isEditing: boolean,
  token: string | null
) => {
  const data = JSON.stringify({
    user_id: user_id,
    text: text,
    date: date,
    completed: completed,
    overdue: overdue,
    isEditing: isEditing,
  });

  return await axios
    .post(serverUrl + "todoapp/createtodo", data, {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch(errorHandling);
};

//delete todo

export const deleteTodo = async (id: string | null, token: string | null) => {
  return await axios
    .delete(serverUrl + `todoapp/deletetodo/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch(errorHandling);
};

//update todo

export const updateTodo = async (
  id: string | null,
  text: string,
  date: string,
  token: string | null
) => {
  const data = JSON.stringify({
    text: text,
    date: date,
  });

  return await axios
    .patch(serverUrl + `todoapp/updatetodo/${id}`, data, {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => console.log(res))
    .catch(errorHandling);
};

export const updateCompleteField = async (
  id: string | null,
  completed: boolean,
  token: string | null
) => {
  const data = JSON.stringify({
    completed: completed,
  });

  return await axios
    .patch(serverUrl + `todoapp/updatecomplete/${id}`, data, {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => console.log(res))
    .catch(errorHandling);
};

export const updateEditingField = async (
  id: string | null,
  isEditing: boolean,
  token: string | null
) => {
  const data = JSON.stringify({
    isEditing: isEditing,
  });

  return await axios
    .patch(serverUrl + `todoapp/updateediting/${id}`, data, {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => console.log(res))
    .catch(errorHandling);
};

export default axios;
