# Bookstore API

Bookstore API is a Node.js application that provides a simple bookstore management system with user registration, book listing, and order creation functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Testing](#testing)

## Introduction

The Bookstore API is designed to help manage a bookstore's user registration, book inventory, and order processing. It provides a RESTful API for creating users, listing books, and managing orders.

## Features

- User registration with name, email, password, address, phone, and payment card details.
- Listing available books with details like title, author, and price.
- Creating orders by specifying the user and a list of books.

## Getting Started

To run the project locally, follow the steps below.

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB: docker run -d -p 27017:27017 --name mongodb-container mongo

### Installation

1.  Clone the repository
2.  npm install
3.  edit .env file
    ```
    NODE_ENV=development
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017
    JWT_SECRET=secret
    ```
4.  npm run seed
5.  npm run dev or npm run start

## Testing

Jest is used for testing. To run the tests, use the following command: npm run test
