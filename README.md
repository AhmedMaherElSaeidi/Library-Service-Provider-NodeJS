# Library Server Provider using NodeJS

## Table of Contents

- [Project Description](#project-description)
- [Database Models](#database-models)
  - [User Model](#user-model)
    - [user_id](#user-id)
    - [username](#username)
    - [email](#email)
    - [password](#password)
    - [phone](#phone)
    - [borrowCount](#borrowcount)
    - [status](#status)
    - [type](#type)
    - [Relationships](#user-model-relationships)
  - [Book Model](#book-model)
    - [book_id](#book-id)
    - [ISBN](#isbn)
    - [title](#title)
    - [author](#author)
    - [description](#description)
    - [rack_number](#rack-number)
    - [photo](#photo)
    - [Relationships](#book-model-relationships)
  - [Borrow Model](#borrow-model)
    - [borrow_id](#borrow-id)
    - [return_date](#return-date)
    - [status](#borrow-status)
    - [Relationships](#borrow-model-relationships)
  - [Gender Model](#gender-model)
    - [gender_id](#gender-id)
    - [gender](#gender)
    - [Relationships](#gender-model-relationships)
  - [Category Model](#category-model)
    - [category_id](#category-id)
    - [category](#category)
    - [Relationships](#category-model-relationships)
- [Backend APIs](#backend-apis)
  - [Authentication Routes (`authentication.route.js`)](#authentication-routes-authenticationroutejs)
  - [Book Routes (`book.route.js`)](#book-routes-bookroutejs)
  - [Category Routes (`category.route.js`)](#category-routes-categoryroutejs)
  - [Gender Routes (`gender.route.js`)](#gender-routes-genderroutejs)
  - [User Routes (`user.route.js`)](#user-routes-userroutejs)
  - [Borrow Routes (`borrow.route.js`)](#borrow-routes-borrowroutejs)
- [Starting the Backend](#starting-the-backend)
- [UI](#user-interface)

## Project Description

The LibraryServer Provider is a comprehensive web solution designed to automate and facilitate the library's operations. It provides functionality for managing books, user accounts, and borrowing activities, ensuring efficient library management.

## Database Models

### User Model

#### user_id

- **Type:** INTEGER
- **Description:** Unique identifier for each user. Auto-incremented primary key.

#### username

- **Type:** STRING
- **Description:** The username of the user.
- **Validation:** Must be between 5 and 20 characters.

#### email

- **Type:** STRING
- **Description:** The email address of the user.
- **Unique:** Must be unique.
- **Validation:** Must be a valid email format.

#### password

- **Type:** STRING
- **Description:** The password for the user account.

#### phone

- **Type:** STRING(11)
- **Description:** The phone number of the user.
- **Validation:** Must be exactly 11 characters.

#### borrowCount

- **Type:** INTEGER
- **Description:** The number of books the user can borrow.
- **Default Value:** 3
- **Validation:** Must be between 1 and 10 and numeric.

#### status

- **Type:** ENUM('active', 'inactive')
- **Description:** The status of the user account.
- **Default Value:** inactive

#### type

- **Type:** ENUM('librarian', 'normal')
- **Description:** The type of user.
- **Default Value:** normal

### Relationships

- **Has Many:** Borrows (User to Borrow)
- **Has Many:** Books (User to Book)
- **Belongs To:** Gender (User to Gender)

---

### Book Model

#### book_id

- **Type:** INTEGER
- **Description:** Unique identifier for each book. Auto-incremented primary key.

#### ISBN

- **Type:** INTEGER
- **Description:** International Standard Book Number.
- **Unique:** Must be unique.
- **Validation:** Must be numeric.

#### title

- **Type:** STRING
- **Description:** The title of the book.

#### author

- **Type:** STRING
- **Description:** The author of the book.

#### description

- **Type:** STRING
- **Description:** A brief description of the book.

#### rack_number

- **Type:** INTEGER
- **Description:** The rack number where the book is located.
- **Validation:** Must be between 1 and 10.

#### photo

- **Type:** STRING
- **Description:** A URL to the book's cover photo.

### Relationships

- **Has Many:** Borrows (Book to Borrow)
- **Belongs To:** User (Book to User)
- **Belongs To:** Category (Book to Category)

---

### Borrow Model

#### borrow_id

- **Type:** INTEGER
- **Description:** Unique identifier for each borrow record. Auto-incremented primary key.

#### return_date

- **Type:** STRING
- **Description:** The return date of the borrowed book.
- **Allow Null:** true

#### status

- **Type:** ENUM('accepted', 'waiting')
- **Description:** The status of the borrow request.
- **Default Value:** waiting
- **Allow Null:** false

### Relationships

- **Belongs To:** User (Borrow to User)
- **Belongs To:** Book (Borrow to Book)

---

### Gender Model

#### gender_id

- **Type:** INTEGER
- **Description:** Unique identifier for each gender. Auto-incremented primary key.

#### gender

- **Type:** STRING
- **Description:** The gender description.

### Relationships

- **Has Many:** Users (Gender to User)

---

### Category Model

#### category_id

- **Type:** INTEGER
- **Description:** Unique identifier for each category. Auto-incremented primary key.

#### category

- **Type:** STRING
- **Description:** The category description.

### Relationships

- **Has Many:** Books (Category to Book)


## Backend APIs
  
### Authentication Routes (`authentication.route.js`)

- `/api/auth/login`
  - Method: `POST`
  - Description: Authenticate a user and generate a token
    
- `/api/auth/register`
  - Method: `POST`
  - Description: Register a new user

---

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

---
 
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

 ---

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

---

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

---

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

## Starting the Backend
To start the backend for the first time, follow these steps:

* Execute the `run_app` script to initialize the application
* After running the `run_app` script, you need to stop the application by running the `stop_app` script.
* Finally, run the `run_app` script once more to start the application.

Your backend server should now be up and running. You can access the API endpoints as described in the Backend APIs section.

## User Interface
Here you can find the implemented [Frontend](https://github.com/AhmedMaherElSaeidi/Library-Service-Provider-ReactJs).
