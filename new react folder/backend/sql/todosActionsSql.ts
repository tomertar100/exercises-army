import { pool } from "./connections";

export async function getAllTodosSql({ user_id }) {
  const connected = await pool.connect();

  try {
    const result = await connected.query(
      `SELECT * FROM todos where user_id = '${user_id}' order by date ASC`
    );
    return result.rows;
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    await connected.release();
  }
}

export async function addTodoSql({
  user_id,
  text,
  date,
  completed,
  overdue,
  isEditing,
}) {
  const connected = await pool.connect();

  try {
    return await connected.query(
      `INSERT INTO todos(user_id,text,date,completed,overdue,isEditing) VALUES(${user_id},'${text}','${date}',${completed},${overdue},${isEditing})`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    return connected.release();
  }
}

export async function updateTodoSql({ id, text, date }) {
  const connected = await pool.connect();

  try {
    return await connected.query(
      `UPDATE todos SET text='${text}',date='${date}' WHERE task_id =${id}`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    connected.release();
  }
}

export async function updateCompleteSql({ id, completed }) {
  const connected = await pool.connect();

  try {
    return await connected.query(
      `UPDATE todos SET completed=${completed} WHERE task_id =${id}`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    connected.release();
  }
}

export async function updateEditingTodoSql({ id, isEditing }) {
  const connected = await pool.connect();

  try {
    return await connected.query(
      `UPDATE todos SET isEditing=${isEditing} WHERE task_id =${id}`
    );
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    connected.release();
  }
}

export async function deleteTodoSql({ id }) {
  const connected = await pool.connect();

  try {
    return await connected.query(`DELETE FROM todos where task_id = ${id}`);
  } catch (error) {
    console.log("error querying: " + error);
    return;
  } finally {
    connected.release();
  }
}
