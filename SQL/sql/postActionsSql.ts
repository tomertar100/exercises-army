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
