import {
  getAllPostsSql,
  getPostSql,
  createPostSql,
} from "../../sql/postActionsSql";

export async function getAllPosts() {
  return await getAllPostsSql();
}

export async function getPost(id) {
  return await getPostSql(id);
}

export async function createPost(username, password) {
  return await createPostSql(username, password);
}
