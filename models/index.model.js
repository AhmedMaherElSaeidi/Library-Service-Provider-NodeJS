// CONVERT MODELS TO TABLES USING SEQUELIZE ORM
const Sequelize = require("sequelize");
const db = require("../config/database.config");

// import (models functions)
const UserModel = require("./User.model");
const GenderModel = require("./gender.model");
const BookModel = require("./Book.model");
const BorrowModel = require("./Borrow.model");
const CategoryModel = require("./category.model");

// convert models to tables (calling models functions)
const User = UserModel(db, Sequelize);
const Gender = GenderModel(db, Sequelize);
const Book = BookModel(db, Sequelize);
const Borrow = BorrowModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);

// one to many (user and borrow tables)
User.hasMany(Borrow, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "user_id",
  as: "user_borrow",
});
Borrow.belongsTo(User, { foreignKey: "user_id", as: "user_borrow" });

// one to many (user and book tables)
User.hasMany(Book, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "user_id",
  as: "user_book",
});
Book.belongsTo(User, { foreignKey: "user_id", as: "user_book" });

// one to many (book and borrow tables)
Book.hasMany(Borrow, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "book_id",
  as: "book_borrow",
});
Borrow.belongsTo(Book, { foreignKey: "book_id", as: "book_borrow" });

// many to one (category and book tables)
Category.hasMany(Book, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "category_id",
  as: "category_book",
});
Book.belongsTo(Category, { foreignKey: "category_id", as: "category_book" });

// many to one (Gender and User tables)
Gender.hasMany(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "gender_id",
  as: "gender_user",
});
User.belongsTo(Gender, { foreignKey: "gender_id", as: "gender_user" });

// convert models to tables
// force:false => if tables are not created, create these tables
// make force:true => when you need to drop this schema and build it again
db.sync({ force: false }).then(async () => {
  console.log("Tables Created!");

  // Insert initial data only if the table is empty
  const genderCount = await Gender.count();
  if (genderCount === 0) {
    await Gender.bulkCreate([{ gender: "Male" }, { gender: "Female" }]);
    console.log("Initial Gender records inserted!");
  }

  const categoryCount = await Category.count();
  if (categoryCount === 0) {
    await Category.bulkCreate([
      { category: "Fiction" },
      { category: "psychology" },
      { category: "novel" },
      { category: "horror" },
    ]);
    console.log("Initial Category records inserted!");
  }
});

// expoert tables
module.exports = {
  User,
  Gender,
  Book,
  Borrow,
  Category,
};
