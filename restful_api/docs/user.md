# User
##  Register User API
Endpoint : [GET] /api/users
Request Body :
```json
{
  "username": "yat",
  "password": "rahasia",
  "name": "Hidayat"
}
```
Response Body Success :
```json
{
  "username": "yat",
  "name": "Hidayat"
}
```
Response Body Error :
```json
{
  "errors": "Username already registered",
}
```

##  Login User API
Endpoint : [POST] /api/users/login
Request Body :
```json
{
  "username": "yat",
  "password": "rahasia",
}
```
Response Body Success :
```json
{
  "token": "unique-token",
}
```
Response Body Error :
```json
{
  "errors": "Username or password wrong",
}
```

##  Update User API
Endpoint : [PATCH] /api/users/current

Headers : 
- Authorization : token

Request Body :
```json
{
  "name": "John", // optional
  "password": "newpassword" // optional,
}
```
Response Body Success :
```json
{
  "username": "yat",
  "name": "John",
}
```
Response Body Error :
```json
{
  "errors": "name length max 100",
}
```

##  Get User API
Endpoint : [PATCH] /api/users/current

Headers : 
- Authorization : token

Request Body :
```json
{
  "name": "John", // optional
  "password": "newpassword" // optional,
}
```
Response Body Success :
```json
{
  "username": "yat",
  "name": "John",
}
```
Response Body Error :
```json
{
  "errors": "name length max 100",
}
```

##  Logout User API
Endpoint : [DELETE] /api/users/logout

Headers : 
- Authorization : token

Response Body Success :
```json
{
  "data": "OK",
}
```
Response Body Error :
```json
{
  "errors": "Unauthorized",
}
```

