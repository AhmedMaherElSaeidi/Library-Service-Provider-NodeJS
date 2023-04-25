// connect to db using sequelize ORM
const Sequelize = require("sequelize");
const config = require("./config.config");

// create db connection
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
