import {
  getAllPostsSql,
  getPostSql,
  createPostSql,
  upvotePostSql,
  downvotePostSql,
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

export async function upvotePost(id) {
  return await upvotePostSql(id);
}

export async function downvotePost(id) {
  return await downvotePostSql(id);
}
