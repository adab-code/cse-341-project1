# CSE 341 Project 1 — Contacts API

A REST API for managing contacts, built with Node.js, Express and MongoDB.
Deployed on Render and documented with Swagger.

## Getting started

1. Install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file in the project root with your MongoDB connection string:
   ```
   MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>/<db>
   PORT=3001
   ```
3. Start the server:
   ```
   npm start        # node server.js
   npm run dev      # nodemon server.js
   ```

The server runs on port `3001` by default (set `PORT` to override).

## Data model

Every document in the `contacts` collection has these five required fields:

| Field          | Type   | Example                  |
| -------------- | ------ | ------------------------ |
| `firstName`    | String | Sofia                    |
| `lastName`     | String | Ramirez                  |
| `email`        | String | sofia.ramirez@example.com |
| `favoriteColor`| String | purple                   |
| `birthday`     | String | 1998-04-12               |

## Endpoints

| Method | URL              | Description                    | Success |
| ------ | ---------------- | ------------------------------ | ------- |
| GET    | `/`              | Welcome message                | 200     |
| GET    | `/contacts`      | Get all contacts               | 200     |
| GET    | `/contacts/{id}` | Get a single contact           | 200     |
| POST   | `/contacts`      | Create a contact, returns `_id`| 201     |
| PUT    | `/contacts/{id}` | Update a contact               | 204     |
| DELETE | `/contacts/{id}` | Delete a contact               | 204     |
| GET    | `/api-docs`      | Swagger UI                     | 200     |

Error responses: `400` for a malformed id or a missing required field, and `404`
when no contact matches the given id.

## API docs

Interactive API documentation is available at `/api-docs`.

To regenerate `swagger.json` from the routes:
```
npm run swagger
```

## Testing the routes

`routes.rest` is a REST Client file for Visual Studio Code that exercises all
five endpoints. Set the `@host` variable at the top of the file to the Render
URL to test the deployed API, or to `http://localhost:3001` to test locally.

## Architecture

```
├── server.js          Express setup, mounts the router, starts listening
├── routes/
│   ├── index.js       Root router: home route, /api-docs and /contacts
│   ├── contacts.js    Declares the five endpoints and their Swagger docs
│   └── swagger.js     Serves the Swagger UI
├── controllers/
│   └── contacts.js    Request handling and MongoDB queries
└── data/
    └── database.js    MongoDB connection, shared across the app
```

Routes contain no business logic, and the connection string lives only in the
`.env` file, which is excluded from version control.

## Tech stack

- Node.js + Express 5
- MongoDB (official driver)
- swagger-autogen / swagger-ui-express
