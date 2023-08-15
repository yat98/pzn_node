# Address

## Create Address API
Endpoint : [POST] /api/contacts/:contactId/addresses

Headers : 
- Authorization : token

Request Body :
```json
{
  "street": "Lorem Road",
  "city": "Ipsum City",
  "province": "Sit Dolor",
  "country": "Amet",
  "postal_code": "123",
}
```
Response Body Success :
```json
{
  "data": {
    "id": 1,
    "street": "Lorem Road",
    "city": "Ipsum City",
    "province": "Sit Dolor",
    "country": "Amet",
    "postal_code": "123",
  }
}
```
Response Body Error :
```json
{
  "errors": "Country is required",
}
```

## Update Address API
Endpoint : [PUT] /api/contacts/:contactId/addresses/:addressId

Headers : 
- Authorization : token

Request Body :
```json
{
  "street": "Lorem Road",
  "city": "Ipsum City",
  "province": "Sit Dolor",
  "country": "Amet",
  "postal_code": "123",
}
```
Response Body Success :
```json
{
  "data": {
    "id": 1,
    "street": "Lorem Road",
    "city": "Ipsum City",
    "province": "Sit Dolor",
    "country": "Amet",
    "postal_code": "123",
  }
}
```
Response Body Error :
```json
{
  "errors": "Country is required",
}
```

## Get Address API
Endpoint : [GET] /api/contacts/:contactId/addresses/:addressId

Headers : 
- Authorization : token

Response Body Success :
```json
{
  "data": {
    "id": 1,
    "street": "Lorem Road",
    "city": "Ipsum City",
    "province": "Sit Dolor",
    "country": "Amet",
    "postal_code": "123",
  }
}
```
Response Body Error :
```json
{
  "errors": "Contact is not found",
}
```

## List Address API
Endpoint : [GET] /api/contacts/:contactId/addresses

Headers : 
- Authorization : token

Response Body Success :
```json
{
  "data": [
    {
      "id": 1,
      "street": "Lorem Road",
      "city": "Ipsum City",
      "province": "Sit Dolor",
      "country": "Amet",
      "postal_code": "123",
    },
    {
      "id": 2,
      "street": "Ipsum Road",
      "city": "Lorem City",
      "province": "Sit Dolor",
      "country": "Amet",
      "postal_code": "228",
    },
    ...
  ]
}
```
Response Body Error :
```json
{
  "errors": "Contact is not found",
}
```

## Remove Address API
Endpoint : [DELETE] /api/contacts/:contactId/addresses/:addressId

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
  "errors": "Address is not found",
}
```

