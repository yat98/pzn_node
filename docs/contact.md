# Contact

## Create Contact API
Endpoint : [POST] /api/contacts

Headers : 
- Authorization : token

Request Body :
```json
{
  "first_name": "Hidayat",
  "last_name": "Chandra",
  "email": "yat@mail.com",
  "phone_number": "0808080808"
}
```
Response Body Success :
```json
{
  "data": {
    "id": 1,
    "first_name": "Hidayat",
    "last_name": "Chandra",
    "email": "yat@mail.com",
    "phone_number": "0808080808"
  }
}
```
Response Body Error :
```json
{
  "errors": "Email is not valid format",
}
```

## Update Contact API
Endpoint : [PUT] /api/contacts/:id

Headers : 
- Authorization : token

Request Body :
```json
{
  "first_name": "Hidayat",
  "last_name": "Chandra",
  "email": "yat@mail.com",
  "phone_number": "0808080808"
}
```
Response Body Success :
```json
{
  "data": {
    "id": 1,
    "first_name": "Hidayat",
    "last_name": "Chandra",
    "email": "yat@mail.com",
    "phone_number": "0808080808"
  }
}
```
Response Body Error :
```json
{
  "errors": "Email is not valid format",
}
```

## Get Contact API
Endpoint : [GET] /api/contacts/:id

Headers : 
- Authorization : token

Response Body Success :
```json
{
  "data": {
    "id": 1,
    "first_name": "Hidayat",
    "last_name": "Chandra",
    "email": "yat@mail.com",
    "phone_number": "0808080808"
  }
}
```
Response Body Error :
```json
{
  "errors": "Contact not found",
}
```

## Search Contact API
Endpoint : [DELETE] /api/contacts/:id

Headers : 
- Authorization : token

Query params :
- name : search by first_name or last_name, using like query [optional]
- email : search by email, using like query [optional]
- phone : search by phone, using like query [optional]
- page : number of page, default 1
- size : size per page  ,default 10

Response Body Success :
```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Hidayat",
      "last_name": "Chandra",
      "email": "yat@mail.com",
      "phone_number": "0808080808"
    },
    {
      "id": 2,
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@mail.com",
      "phone_number": "0807070707"
    },
    ...
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30,
  }
}
```
Response Body Error :
```json
{
  "errors": "Contact not found",
}
```


## Remove Contact API
Endpoint : [DELETE] /api/contacts/:id

Headers : 
- Authorization : token

Response Body Success :
```json
{
  "data": "OK"
}
```
Response Body Error :
```json
{
  "errors": "Contact not found",
}
```
