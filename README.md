# GitHub-Job Server

## Description

This project is developed with Node Express.js, pg for PostgreSQL client, and additional library such as bcrypt and jsonwebtoken for supplementary.

This is the Node server-side repo of the GitHub-Job project. Endpoints available:

- POST `http://localhost:8080/login`, with body `{"username": string, "password": string}`. Checks user from query DB PostgreSQL, authenticate, and return back username and JWT Token.
- GET `http://localhost:8080/job`, with headers `Authorization: Bearer token`, and query params optional `?description=string&location=string&full_time=true&page=1`. Authorizes JWT Token, fetches from given json file, filters depending on given query params, and returns desired job list data with pagination (set 5 each page).
- GET `http://localhost:8080/job/:id`, with headers `Authorization: Bearer token`. after clicking on a job card, viewing the job's details. Authorizes JWT Token, fetches detail from given param id, and returns the data.

User can also click logout button after logged in.

## How to Run

1. Create `.env` from given `.env.example` for working provided SQL login credentials. (or manual hash bcrypt by yourself because of no register functionality in requirements).
2. Execute provided `database.sql` query for backend setup and credential examples. Make sure your PostgreSQL is connected.
3. Run following commands:

```bash
# install dependencies
npm i

# run server (at localhost:8080)
node index.js
```
