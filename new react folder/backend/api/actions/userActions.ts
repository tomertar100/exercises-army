import { getUserSql, createUserSql } from "../../sql/userActionsSql";

export async function getUser(username: string) {
  return await getUserSql(username);
}

export async function createUser(username: string, password: string) {
  return await createUserSql(username, password);
}
