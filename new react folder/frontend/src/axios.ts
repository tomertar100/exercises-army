import axios from "axios";
import { User } from "../src/types/user";

type LoginToServer = (username: string, password: string) => Promise<any>;
type RegisterToServer = (username: string, password: string) => Promise<any>;

const sessionStorageObject = "JWT";
const serverUrl = "http://localhost:3002/";

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
  const user: User = {
    username: username,
    password: password,
  };
  const data = JSON.stringify(user);
  return await axios
    .post(serverUrl + "login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch(errorHandling);
};

export const registerToServer: RegisterToServer = async (
  username,
  password
) => {
  const user: User = {
    username: username,
    password: password,
  };
  const data = JSON.stringify(user);
  return await axios
    .post(serverUrl + "register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch(errorHandling);
};

axios.defaults.baseURL = serverUrl;

//todos axios request

//get all the todos from server

// export const getEverything = async (token: string | null) => {
//   return await axios
//     .get(serverUrl + "/todos/alltodos", {
//       headers: {
//         authorization: `bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       return res.data;
//     })
//     .catch(errorHandling);
// };

//get todos from server based on user_id

export const getTodos = async (
  user_id: string | null,
  token: string | null
) => {
  return await axios
    .get(serverUrl + `todos/${user_id}`, {
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
    .post(serverUrl + "todos/", data, {
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
    .delete(serverUrl + `todos/${id}/delete`, {
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
    .patch(serverUrl + `todos/${id}/update`, data, {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => console.log(res.data))
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
    .patch(serverUrl + `todos/${id}/complete`, data, {
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
    .patch(serverUrl + `todos/${id}/editing`, data, {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => console.log(res.data))
    .catch(errorHandling);
};

export default axios;
