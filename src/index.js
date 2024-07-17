const express = require('express');
const handler = require('./routes/handler');
const middleware = require('./middleware/auth')
const db = require('./config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', handler.register);
app.post('/login', handler.login);
app.get('/user', middleware.verify_header_autoriz, handler.get_user);
app.get('/user/todos', middleware.verify_header_autoriz, handler.get_users_todos);
app.get('/users/:email', middleware.verify_header_autoriz, handler.get_users_email);
app.get('/users/:id', middleware.verify_header_autoriz, handler.get_users_id);
app.put('/users/:id', middleware.verify_header_autoriz, handler.update_users_id);
app.delete('/users/:id', middleware.verify_header_autoriz, handler.delete_users_id);
app.get('/todos', middleware.verify_header_autoriz, handler.get_todos);
app.get('/todos/:id', middleware.verify_header_autoriz, handler.get_todos_id);
app.post('/todos', middleware.verify_header_autoriz, handler.post_todos);
app.put('/todos/:id', middleware.verify_header_autoriz, handler.update_todos_id);
app.delete('/todos/:id', middleware.verify_header_autoriz, handler.delete_todos_id);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
