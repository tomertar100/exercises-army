import { pool } from "./connections";

export async function getAllTodosSql() {
  const connected = await pool.connect();

  try {
    return (await connected.query("SELECT * FROM todos")).rows;
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}
