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
