import { pool } from "./connections";

export async function getUserSql(username: string) {
  const connected = await pool.connect();

  try {
    const result = await connected.query(
      `SELECT * FROM users WHERE username ='${username}'`
    );

    return result.rows[0];
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    connected.release();
  }
}

export async function createUserSql(username: string, password: string) {
  const connected = await pool.connect();

  try {
    return await connected.query(
      `INSERT INTO users(username,password) VALUES('${username}','${password}')`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    connected.release();
  }
}
