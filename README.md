
# Project Title

Solution for QontenttAi assignment
## How to test the project
Project is hosted on vercel service on ->
https://qontenttai-assignment.vercel.app/graphql

to test open the apollo sandbox wth below link ->
https://studio.apollographql.com/sandbox/explorer

paste the hosted url(vercel link) and test, schema should be already loaded



## How to Setup Locally

#### Install dependencies
(make sure node is already installed)
```
 npm i
```

#### Prisma setup
Add DATABASE_URL db(postgres/mysql) url and JWT_SECRET in the .env and run following commands
```
1. prisma migrate dev -n migration01
2. prisma generate client
```
#### Run the project
```
 node app.js
```
Visit http://localhost:3000/graphql and apollo sandbox will open for testing

## How authentication mechanism is implemented?

- User Registration: When a user registers, their password is hashed with a salt and stored securely in the database.
- User Login: When a user logs in, their password is authenticated, and a JWT token is generated and sent as a response.
- Protected Routes: The client includes this token in the headers of requests to protected routes (like viewing the profile). The server verifies the token to grant access.



