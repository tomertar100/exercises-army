import { pool } from "./connection";

export async function getAllPostsSql() {
  const connected = await pool.connect();

  try {
    return (await connected.query("SELECT * FROM posts")).rows;
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}

export async function getPostSql(id) {
  const connected = await pool.connect();

  try {
    return (await connected.query(`SELECT * FROM posts WHERE id = '${id}'`))
      .rows[0];
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}

export async function createPostSql(user_id, content) {
  const connected = await pool.connect();

  try {
    return await connected.query(
      `INSERT INTO posts(user_id,content) VALUES('${user_id}','${content}')`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}

export async function upvotePostSql(id) {
  const connected = await pool.connect();

  try {
    const resultRating = (await getPostSql(id)).rating + 1;
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

export async function downvotePostSql(id) {
  const connected = await pool.connect();

  try {
    const resultRating = (await getPostSql(id)).rating - 1;
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
