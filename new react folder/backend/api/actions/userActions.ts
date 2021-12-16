import { getUserSql, createUserSql } from "../../sql/userActionsSql";
import { GetUser, CreateUser } from "../../modals/userActions";
export async function getUser({ username }: GetUser) {
  return await getUserSql({ username });
}

export async function createUser({ username, password }: CreateUser) {
  return await createUserSql({ username, password });
}
