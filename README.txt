# Alkemy
Balance application for Alkemy process made with express and Vue 3

For compiling this application you need to have Node and NPM installed properly.
Clone the repository and execute "npm i" into the folder.
Dotenv module sometimes refuses to install by this method. So, in orther to fix this, install it alone. Execute "npm install dotenv".

In your sql database manager execute the following sentences:
CREATE DATABASE alkemy;

CREATE TABLE alkemy.users (
Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
Username VARCHAR(50) NOT NULL,
Pass VARCHAR(70) NOT NULL
);

CREATE TABLE alkemy.sessions (
Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
User_id INT NOT NULL,
Session VARCHAR(30) NOT NULL
);

CREATE TABLE alkemy.transactions (
Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
Id_user INT NOT NULL,
Type_id INT NOT NULL,
Date DATETIME NOT NULL,
Amount FLOAT NOT NULL,
Concept TEXT NOT NULL
);

CREATE TABLE alkemy.t_types (
Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
Type_name VARCHAR(20) NOT NULL
);

INSERT INTO alkemy.t_types (Type_name) VALUES ('Money_in');
INSERT INTO alkemy.t_types (Type_name) VALUES ('Money_out');

For security, its necesary to create a .env file to store database credentials. This file is excluded of the commit. So, create a .env file with exactlly the following content (make sure to write it your own credentials in spaces like <your host>):
DB_HOST = <your_host>
DB_USER = <your_user>
DB_PASS = <your_password>
DB_NAME = <your_database_name>