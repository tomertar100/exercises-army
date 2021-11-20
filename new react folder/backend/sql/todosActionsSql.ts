import { pool } from "./connections";

export async function getAllTodosSql() {
  const connected = await pool.connect();

  try {
    return (await connected.query(`SELECT * FROM todos`)).rows;
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}

export async function addTodoSql(text, date, completed, overdue, isEditing) {
  const connected = await pool.connect();

  try {
    return await connected.query(
      `INSERT INTO todos(text,date,completed,overdue,isEditing) VALUES('${text}','${date}',${completed},${overdue},${isEditing})`
    );
  } catch (error) {
    console.log("error querying: " + error);
  } finally {
    await connected.release();
  }
}

export async function updateTodoSql(id, text, date) {
  const connected = await pool.connect();

  try {
    return await connected.query(
      `UPDATE todos SET text=${text},date=${date} WHERE id =${id}`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    connected.release();
  }
}

export async function deleteTodoSql(id) {
  const connected = await pool.connect();

  try {
    return await connected.query(`DELETE FROM todos where id = ${id}`);
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}
