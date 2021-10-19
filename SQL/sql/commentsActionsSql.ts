import { pool } from "./connection";

export async function getAllCommentsSql() {
  const connected = await pool.connect();

  try {
    return (await connected.query("SELECT * FROM comments")).rows;
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}

export async function getCommentSql(id) {
  const connected = await pool.connect();

  try {
    return (await connected.query(`SELECT * FROM comments WHERE id = '${id}'`))
      .rows[0];
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}

export async function createCommentSql(user_id, post_id, content) {
  const connected = await pool.connect();

  try {
    return await connected.query(
      `INSERT INTO comments(user_id,post_id,content) VALUES('${user_id}','${post_id}','${content}')`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}

export async function upvoteCommentSql(id) {
  const connected = await pool.connect();

  try {
    const resultRating = (await getCommentSql(id)).rating + 1;
    return await connected.query(
      `UPDATE posts SET rating = ${resultRating} WHERE id = ${id}`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    connected.release();
  }
}

export async function downvoteCommentSql(id) {
  const connected = await pool.connect();

  try {
    const resultRating = (await getCommentSql(id)).rating - 1;
    return await connected.query(
      `UPDATE posts SET rating = ${resultRating} WHERE id = ${id}`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    connected.release();
  }
}
