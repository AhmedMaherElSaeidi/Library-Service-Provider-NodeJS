// imports
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const loggedInAuth = require("./middleware/auth.middleware");

// Import API ENDPOINTS ROUTES
const booksRouter = require('./routes/book.route');
const genderRouter = require('./routes/gender.route');
const usersRouter = require('./routes/user.route');
const borrowsRouter = require('./routes/borrow.route');
const categoryRouter = require('./routes/category.route');
const authRouter = require('./routes/authenication.route');

// Create App
const app = express();
const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;

// Allow cross request from different domain
app.use(cors());

// Parse request body data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middlewares (Send request to specific endpoints)
app.use("/api/books", booksRouter);
app.use("/api/gender", genderRouter);
app.use("/api/users", loggedInAuth, usersRouter);
app.use("/api/borrows", loggedInAuth, borrowsRouter);
app.use("/api/category", categoryRouter);
app.use("/api/auth", authRouter);

// Listen to requests
app.listen(PORT, HOST, (res) => {
    console.log(`SERVER IS RUNNING ON HTTP://${HOST}:${PORT}`);
})