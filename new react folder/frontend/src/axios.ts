import axios from "axios";

type LoginToServer = (username: string, password: string) => any;
type registerToServer = (username: string, password: string) => any;

const sessionStorageObject = "JWT";
const serverUrl = "http://localhost:3002/";

const getConfig = () => {
  return {
    headers: {
      Authorization: `bearer ${sessionStorage.getItem(sessionStorageObject)}`,
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
    // something happened
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

export default axios;
