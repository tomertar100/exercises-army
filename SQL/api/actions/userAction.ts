import {
  getAllUsersSql,
  getUserSql,
  createUserSql,
} from "../../sql/usersActionsSql";

export async function getAllUsers() {
  return await getAllUsersSql();
}

export async function getUser(username) {
  return await getUserSql(username);
}

export async function createUser(username, password) {
  return await createUserSql(username, password);
}
