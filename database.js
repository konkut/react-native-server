import mysql from 'mysql2';
import dotenv from 'dotenv';
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from './config.js';

dotenv.config();

const pool = mysql.createPool({
  //host: process.env.MYSQL_HOST,
  //user: process.env.MYSQL_USER,
  //password: process.env.MYSQL_PASSWORD,
  //database: process.env.MYSQL_DATABASE,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: MYSQL_PORT,
}).promise();

export const getTodoById = async (id) => {
  const [row] = await pool.query(
    'SELECT * FROM todos WHERE id = ?', [id]
  )
  return row[0];
}

export const getTodosById = async (id) => {
  const [rows] = await pool.query(
    'SELECT t.*, s.shared_with_id FROM todos t LEFT JOIN shared_todos s ON t.id = s.todo_id WHERE t.user_id = ? OR s.shared_with_id = ?', [id, id]
  )
  return rows;
}

export const getSharedTodoById = async (id) => {
  const [row] = await pool.query(
    'SELECT * FROM shared_todos WHERE todo_id = ?', [id]
  )
  return row[0];
}

export const getUserById = async (id) => {
  const [row] = await pool.query(
    'SELECT * FROM users WHERE id = ?', [id]
  )
  return row[0];
}

export const getUserByEmail = async (email) => {
  const [row] = await pool.query(
    'SELECT * FROM users WHERE email LIKE ?', [email]
  )
  return row[0];
}

export const insertTodo = async (user_id, title) => {
  const [result] = await pool.query(
    'INSERT INTO todos (title,user_id) VALUES (?,?)', [title, user_id]
  );
  const todoId = result.insertId;
  const todo = getTodoById(todoId);
  return todo;
}

export const deleteTodo = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM todos WHERE id = ?', [id]
  )
  return result;
}

export const toggleCompleted = async (id, value) => {
  const completed = (value) ? true : false;
  const [result] = await pool.query(
    'UPDATE todos SET completed = ? WHERE id = ?', [completed, id]
  )
  return result;
}

export const insertSharedTodo = async (todo_id, user_id, shared_with_id) => {
  const [result] = await pool.query(
    'INSERT INTO shared_todos (todo_id,user_id,shared_with_id) VALUES (?, ?, ?)', [todo_id, user_id, shared_with_id]
  )
  return result.insertId;
}





























