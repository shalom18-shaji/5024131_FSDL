# Week13 Node.js Project

This project demonstrates Node.js installation and configuration, callbacks, event-loop behavior, Express application setup, and a MongoDB-backed REST API.

## Installation

1. Open a terminal in `Week13_280426`.
2. Install dependencies:

```bash
npm install
```

3. Create a copy of the example environment file:

```bash
cp .env.example .env
```

4. Update `.env` if needed:

```text
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/week13db
```

## Run the application

```bash
npm start
```

## Example scripts

- Callback example: `npm run callbacks`
- Event loop example: `npm run event-loop`

## Express + MongoDB

Start the app and visit these routes:

- `GET /` - basic app info
- `GET /callbacks` - callback-based async example
- `GET /event-loop` - event-loop ordering example
- `GET /students` - read all student records from MongoDB
- `POST /students` - insert a new student record
- `GET /students/:id` - read one student by ID

## MongoDB setup

If MongoDB is installed locally, ensure it is running before starting the app.

```bash
mongod --dbpath /path/to/data
```
