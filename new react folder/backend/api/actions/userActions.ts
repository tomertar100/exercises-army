import { getUserSql, createUserSql } from "../../sql/userActionsSql";

export async function getUser(username) {
  return await getUserSql(username);
}

export async function createUser(username, password) {
  return await createUserSql(username, password);
}
