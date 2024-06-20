# Library Server Provider using NodeJS

## Project Description

The LibraryServer Provider is a comprehensive web solution designed to automate and facilitate the library's operations. It provides functionality for managing books, user accounts, and borrowing activities, ensuring efficient library management.

## Available APIs


### Authentication Routes (`authentication.route.js`)

- `/api/auth/login`
  - Method: `POST`
  - Description: Authenticate a user and generate a token
    
- `/api/auth/register`
  - Method: `POST`
  - Description: Register a new user

 
### Book Routes (`book.route.js`)

- `/api/books`
  - Method: `GET`
  - Description: Get all books

- `/api/books/join/book-category`
  - Method: `GET`
  - Description: Get all books joined with category table

- `/api/books/join/book-category-borrow`
  - Method: `GET`
  - Description: Get all books joined with category, and borrow tables
  
- `/api/books/:id`
  - Method: `GET`
  - Description: Get a book by ID

- `/api/books/join/book-category/:id`
  - Method: `GET`
  - Description: Get a book by ID joined with category table
    
- `/api/books/join/book-category-borrow/:id`
  - Method: `GET`
  - Description: Get a book by ID joined with category, and borrow tables
    
- `/api/books`
  - Method: `POST`
  - Description: Add a new book

- `/api/books/:id`
  - Method: `PUT`
  - Description: Update a book by ID

- `/api/books/:id`
  - Method: `DELETE`
  - Description: Delete a book by ID

 
### Category Routes (`category.route.js`)

- `/api/categories`
  - Method: `GET`
  - Description: Get all categories

- `/api/categories/join/category-book`
  - Method: `GET`
  - Description: Get all categories joined with the book table
  
- `/api/categories/:id`
  - Method: `GET`
  - Description: Get a category by ID

- `/api/categories/join/category-book/:id`
  - Method: `GET`
  - Description: Get a category by ID joined with the book table

- `/api/categories`
  - Method: `POST`
  - Description: Add a new category

- `/api/categories/:id`
  - Method: `PUT`
  - Description: Update a category by ID

- `/api/categories/:id`
  - Method: `DELETE`
  - Description: Delete a category by ID

 
### Gender Routes (`gender.route.js`)

- `/api/genders`
  - Method: `GET`
  - Description: Get all genders

- `/api/genders/:id`
  - Method: `GET`
  - Description: Get a gender by ID

- `/api/genders`
  - Method: `POST`
  - Description: Add a new gender

- `/api/genders/:id`
  - Method: `PUT`
  - Description: Update a gender by ID

- `/api/genders/:id`
  - Method: `DELETE`
  - Description: Delete a gender by ID


### User Routes (`user.route.js`)

- `/api/users`
  - Method: `GET`
  - Description: Get all users

- `/api/users/join/user-gender`
  - Method: `GET`
  - Description: Get all users joined with the gender table

- `/api/users/join/user-book`
  - Method: `GET`
  - Description: Get all users joined with the book table
 
- `/api/users/:id`
  - Method: `GET`
  - Description: Get a user by ID

- `/api/users/join/user-book/:id`
  - Method: `GET`
  - Description: Get a user by ID joined with the book table

- `/api/users`
  - Method: `POST`
  - Description: Add a new user

- `/api/users/:id`
  - Method: `PUT`
  - Description: Update a user by ID

- `/api/users/:id`
  - Method: `DELETE`
  - Description: Delete a user by ID


### Borrow Routes (`borrow.route.js`)

- `/api/borrows`
  - Method: `GET`
  - Description: Get all borrows

- `/api/borrows/join/user-book`
  - Method: `GET`
  - Description: Get all borrows joined with the user, and book table

- `/api/borrows/:id`
  - Method: `GET`
  - Description: Get a borrow by ID

- `/api/borrows/join/user-book/:id`
  - Method: `GET`
  - Description: Get a borrow by ID joined with the user, and book table

- `/api/borrows`
  - Method: `POST`
  - Description: Set a new borrow

- `/api/borrows/:id`
  - Method: `PUT`
  - Description: Update a borrow by ID

- `/api/borrows/:id`
  - Method: `DELETE`
  - Description: Delete a borrow by ID
