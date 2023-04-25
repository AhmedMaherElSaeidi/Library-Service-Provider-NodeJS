// User Model (function)

module.exports = (db, type) => {
  return db.define("user", {
    user_id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: type.STRING,
      allowNull: false,
      validate: {
        len: [5, 20]
      }
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    phone: {
      type: type.STRING(11),
      allowNull: false,
      validate: {
        len: [11, 11],
      }
    },
    borrowCount: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 3,
      validate: {
        min: 1,
        max: 10,
        isNumeric: true,
      }
    },
    status: {
      type: type.ENUM('active', 'inactive'),
      defaultValue: 'inactive',
      allowNull: false,
    },
    type: {
      type: type.ENUM('librarian', 'normal'),
      defaultValue: 'normal',
      allowNull: false,
    },
  });
};