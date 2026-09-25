# cse-341-project1

A simple REST API for managing users, built with Express and MongoDB.

## Getting started

1. Install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file in the project root with your MongoDB connection string:
   ```
   MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>/<db>
   ```
3. Start the server:
   ```
   node server.js
   ```

The server runs on port `3001` by default (set `PORT` to override).

## Endpoints

| Method | URL                  | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/`                  | Welcome message          |
| GET    | `/users`             | Get all users            |
| GET    | `/users/:id`         | Get a single user        |
| POST   | `/users`             | Create a user            |
| PUT    | `/users/:id`         | Update a user            |
| DELETE | `/users/:id`         | Delete a user            |
| GET    | `/api-docs`          | Swagger UI               |

## API docs

Interactive API documentation is available at `/api-docs`.

To regenerate `swagger.json` from the routes:
```
node swagger.js
```

## Tech stack

- Node.js + Express
- MongoDB (official driver)
- swagger-ui-express / swagger-autogen