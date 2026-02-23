Task 3: File-Based User Management API

Build a REST API using Express.js and Node.js (no database).

Requirements:

Store users in a users.json file

-> Implement:
1. POST /users → Create user
2. GET /users → Get all users
3. GET /users/:id
4. PUT /users/:id
5. DELETE /users/:id
 
-> Generate custom unique ID (not auto increment)
 
->Handle:
1. Duplicate email check
2. Proper status codes
3. Error middleware

->Add request logging middleware