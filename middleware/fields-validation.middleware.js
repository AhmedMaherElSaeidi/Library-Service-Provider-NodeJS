const { body } = require('express-validator');

const usernameVa1idation = body("username").notEmpty().isString().withMessage("Username isn't valid.").isLength({ min: 5, max: 20 }).withMessage("Username lenght must be between 5~20 chars.");
const emailVa1idation = body("email").isEmail().withMessage("Email isn't valid.");
const passwordVa1idation = body("password").notEmpty().withMessage("Password isn't valid.").isLength({ min: 10 }).withMessage("Password minimum lenght must be 10 chars.");
const borrowCountVa1idation = body("borrowCount").isNumeric().withMessage("BorrowCount isn't valid.");
const phoneVa1idation = body("phone").isNumeric().withMessage("Phone isn't valid.").isLength({ min: 11, max: 11 }).withMessage("Phone lenght must be 11 digit.");

const categoryRefVa1idation = body("category_id").notEmpty().withMessage("Category reference can't be empty.");
const userRefVa1idation = body("user_id").notEmpty().withMessage("User reference can't be empty.");
const bookRefVa1idation = body("book_id").notEmpty().withMessage("Book reference can't be empty.");

module.exports = {
    usernameVa1idation,
    emailVa1idation,
    passwordVa1idation,
    borrowCountVa1idation,
    phoneVa1idation,
    categoryRefVa1idation,
    userRefVa1idation,
    bookRefVa1idation,
}