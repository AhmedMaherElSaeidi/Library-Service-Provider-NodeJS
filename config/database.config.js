// connect to db using sequelize ORM
const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
const config = require("./config.config");

// Function to create the database if it doesn't exist
async function createDatabaseIfNotExists() {
  try {
    const { host, port, username, password, database } = config;
    const connection = await mysql.createConnection({
      host,
      port,
      user: username,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();
  } catch (error) {
    console.error("Error creating database: ", error);
    throw error;
  }
}

// create db connection
createDatabaseIfNotExists();
const conn = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
});

// connect to db
conn
  .authenticate()
  .then(() => {
    console.log("DB Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// export connection
module.exports = conn;
