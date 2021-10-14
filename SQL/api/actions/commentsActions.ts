import {
  getAllCommentsSql,
  getCommentSql,
  createCommentSql,
} from "../../sql/commentsActionsSql";

export async function getAllComments() {
  return await getAllCommentsSql();
}

export async function getComment(id) {
  return await getCommentSql(id);
}

export async function createComment(user_id, post_id, content) {
  return createCommentSql(user_id, post_id, content);
}
