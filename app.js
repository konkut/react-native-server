import express from 'express';
import {
  getTodoById,
  getTodosById,
  getSharedTodoById,
  getUserById,
  getUserByEmail,
  insertTodo,
  deleteTodo,
  toggleCompleted,
  insertSharedTodo,
} from "./database.js";

import cors from 'cors';
import { PORT } from './config.js';

const app = express();

//INDICAMOS QUE SOLO RECIBA PETICIONES JSON EN EL BODY 

//PERMITE ESPECIFICAR DE QUIEN QUEREMOS RECIBIR REQUEST, TAMBIEN PERMITIRA COMUNICARNOS DESDE NUESTRA APLICACION REACT NATIVE
/*app.use(cors({
  origin: '*',  //ESPECIFICAMOS EL ORIGEN DE LA REQUEST QUE ESTARA AUTORIZADO
  methods: ["POST", "GET"], //ESPECIFICAMOS LOS METODOS PERMITIDOS
  credentials: true   //PERMITIR QUE NOS MANDEN CREDENCIALES COMO COOKIES Y AUTENTICACION POR LA API
}));*/
app.use(cors({
  origin: '*',
  methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json())


//AGREGAMOS NUESTRO RUTA Y EL ENDPOINT
app.get('/todos/:id', async (req, res) => {
  const todos = await getTodosById(req.params.id);
  res.status(200).send(todos);
})

http://192.168.0.105:8080/todos/shared_todos/${id}
app.get('/todos/shared_todos/:id', async (req, res) => {
  const shared_todo = await getSharedTodoById(req.params.id);  //registro completo del tabla shared_todos;
  const author = await getUserById(shared_todo.user_id);  //datos del autors
  const shared_with_user = await getUserById(shared_todo.shared_with_id); //datos del usuario compartido
  res.status(200).send({ author, shared_with_user });
})

app.get('/users/:id', async (req, res) => {
  const users = await getUserById(req.params.id);
  res.status(200).send(users);
})

app.put('/todos/:id', async (req, res) => {
  const { value } = req.body;
  const todo = await toggleCompleted(req.params.id, value);
  res.status(200).send(todo);
})


app.delete('/todos/:id', async (req, res) => {
  await deleteTodo(req.params.id);
  res.send({ message: 'Tarea eliminada exitosamente' });
  //res.json({ message: 'Tarea eliminada exitosamente' });
})

app.post("/todos/shared_todos", async (req, res) => {
  const { todo_id, user_id, email } = req.body;
  const userToShare = await getUserByEmail(email);
  const sharedTodo = await insertSharedTodo(todo_id, user_id, userToShare.id);
  res.status(201);
});

app.post('/todos', async (req, res) => {
  const { user_id, title } = req.body;
  const todo = await insertTodo(user_id, title);
  res.status(201).send(todo);
})

//ESTADO 201 SIGNIFICA QUE SE CREO CORRECTAMENTE EN EL SERVIDOR
//ESTADO 200 SIGNIFICA EXITOSO
//ESTADO ERRORES 400 Y 500


app.listen(PORT, '0.0.0.0', () => {
  console.log('server running on port', PORT);
})















