import {
  getAllPostsSql,
  getPostSql,
  createPostSql,
} from "../../sql/postsActionsSql";

export async function getAllPosts() {
  return await getAllPostsSql();
}

export async function getPost(id) {
  return await getPostSql(id);
}

export async function createPost(user_id, content) {
  return await createPostSql(user_id, content);
}
