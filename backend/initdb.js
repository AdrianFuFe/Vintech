const mysql = require("mysql2");
require("dotenv").config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

function main() {
  const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  });
  connection.connect((error) => {
    if (error) console.error(error.sqlMessage);
  });

  dropDb(connection);
  createDb(connection);
  enterDb(connection);
  createUsers(connection);
  createProducts(connection);
  createBookings(connection);
  createMessages(connection);
  createFeedbacks(connection);
  createProductImgs(connection);
  createBuyedList(connection);
  createFavList(connection);
  endConnection(connection);
}

function dropDb(connection) {
  connection.query(`DROP DATABASE ${MYSQL_DATABASE};`, (error) => {
    if (error) console.error(error.sqlMessage);
  });
}

function createDb(connection) {
  connection.query(`CREATE DATABASE ${MYSQL_DATABASE};`, (error) => {
    if (error) console.error(error.sqlMessage);
  });
}

function enterDb(connection) {
  connection.query(`USE ${MYSQL_DATABASE};`, (error) => {
    if (error) console.error(error.sqlMessage);
  });
  connection.query(`SET FOREIGN_KEY_CHECKS = 0;`, (error) => {
    if (error) console.error(error.sqlMessage);
  });
}

function createUsers(connection) {
  connection.query(
    `CREATE TABLE users(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        img TINYTEXT,
        username VARCHAR(50) NOT NULL,
        fname VARCHAR(25),
        lname VARCHAR(50),
        email VARCHAR(80) UNIQUE NOT NULL,
        pwd TINYTEXT NOT NULL,
        bio TEXT,
        last_ubication VARCHAR(60),
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('inactive', 'active'),
        activation_code TINYTEXT
        );`,
    (error) => {
      if (error) console.error(error.sqlMessage);
    }
  );
}

function createProducts(connection) {
  connection.query(
    `CREATE TABLE products(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_seller INT UNSIGNED,
        FOREIGN KEY (id_seller) REFERENCES users(id) ON DELETE CASCADE,
        title TINYTEXT NOT NULL,
        price DECIMAL(7,2) NOT NULL,
        description TEXT,
        ubication VARCHAR(60),
        modification_date TIMESTAMP,
        category ENUM('ordenadores', 'telefonia', 'audio', 'foto', 'video', 'televisores', 'consolas', 'redes', 'otros'),
        status ENUM('active', 'reserved', 'selled')
        );`,
    (error) => {
      if (error) console.error(error.sqlMessage);
    }
  );
}

function createBookings(connection) {
  connection.query(
    `CREATE TABLE bookings(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        meeting_date TIMESTAMP,
        ubication VARCHAR(60),
        status ENUM('sent', 'read', 'rejected', 'accepted', 'cancelled'),
        id_user_A INT UNSIGNED,
        FOREIGN KEY (id_user_A) REFERENCES users(id) ON DELETE CASCADE,
        id_user_B INT UNSIGNED,
        FOREIGN KEY (id_user_B) REFERENCES users(id) ON DELETE CASCADE,
        id_product INT UNSIGNED,
        FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
        );`,
    (error) => {
      if (error) console.error(error.sqlMessage);
    }
  );
}

function createMessages(connection) {
  connection.query(
    `CREATE TABLE messages(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        text TEXT NOT NULL,
        status ENUM('sent', 'read'),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_user_A INT UNSIGNED,
        FOREIGN KEY (id_user_A) REFERENCES users(id) ON DELETE CASCADE,
        id_user_B INT UNSIGNED,
        FOREIGN KEY (id_user_B) REFERENCES users(id) ON DELETE CASCADE,
        id_product INT UNSIGNED,
        FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
        );`,
    (error) => {
      if (error) console.error(error.sqlMessage);
    }
  );
}

function createFeedbacks(connection) {
  connection.query(
    `CREATE TABLE feedbacks(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        stars ENUM('0', '1', '2', '3', '4', '5') NOT NULL,
        comment TINYTEXT,
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_user_A INT UNSIGNED,
        FOREIGN KEY (id_user_A) REFERENCES users(id) ON DELETE CASCADE,
        id_user_B INT UNSIGNED,
        FOREIGN KEY (id_user_B) REFERENCES users(id) ON DELETE CASCADE
        );`,
    (error) => {
      if (error) console.error(error.sqlMessage);
    }
  );
}

function createProductImgs(connection) {
  connection.query(
    `CREATE TABLE product_imgs(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        img VARCHAR(40),
        id_product INT UNSIGNED,
        FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
        );`,
    (error) => {
      if (error) console.error(error.sqlMessage);
    }
  );
}

function createBuyedList(connection) {
  connection.query(
    `CREATE TABLE buyed_list(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_user_A INT UNSIGNED,
        FOREIGN KEY (id_user_A) REFERENCES users(id) ON DELETE CASCADE,
        id_user_B INT UNSIGNED,
        FOREIGN KEY (id_user_B) REFERENCES users(id) ON DELETE CASCADE,
        id_product INT UNSIGNED,
        FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
        );`,
    (error) => {
      if (error) console.error(error.sqlMessage);
    }
  );
}

function createFavList(connection) {
  connection.query(
    `CREATE TABLE fav_list(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
        id_product INT UNSIGNED,
        FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE
        );`,
    (error) => {
      if (error) console.error(error.sqlMessage);
    }
  );
}

function endConnection(connection) {
  connection.query(`SET FOREIGN_KEY_CHECKS = 1;`, (error) => {
    if (error) console.error(error.sqlMessage);
  });
  connection.end((error) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log("Base de datos creada con éxito");
    }
  });
}

main();
