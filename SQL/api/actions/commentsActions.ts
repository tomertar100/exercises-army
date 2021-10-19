import {
  getAllCommentsSql,
  getCommentSql,
  createCommentSql,
  upvoteCommentSql,
  downvoteCommentSql,
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

export async function upvoteComment(id) {
  return await upvoteCommentSql(id);
}

export async function downvoteComment(id) {
  return await downvoteCommentSql(id);
}
