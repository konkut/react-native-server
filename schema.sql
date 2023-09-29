CREATE DATABASE todo_tutorial; 
USE todo_tutorial;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
); 

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    todo_id INT,
    shared_with_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO users(name,email,password) VALUES ('Beto','user1@example.com','password1');
INSERT INTO users(name,email,password) VALUES ('Alberto','user2@example.com','password2');
SELECT t.*, s.shared_with_id FROM todos t LEFT JOIN shared_todos s 
ON t.id = s.todo_id WHERE t.user_id = 1 OR s.shared_with_id = 1;

INSERT INTO todos (title,user_id) VALUES
('Ir a correr en la mañana',1),
('Trabajar en un proyecto',1),
('Limpiar la casa',1);

INSERT INTO shared_todos (todo_id,user_id,shared_with_id) VALUES
(1,1,2);
SHOW DATABASES;
SHOW TABLES;
 
DESCRIBE shared_todos;
SELECT * FROM users;

SELECT * FROM users WHERE id = 1;

SELECT * FROM todos WHERE user_id = 1;











