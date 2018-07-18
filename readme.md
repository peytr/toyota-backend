# BACKEND API ENDPOINTS

## Users
------
API Routes: 
1. GET /api/users/ 
2. POST /api/users/login 
3. POST /api/users/register
4. GET /api/users/current
5. GET /api/users/:id
6. PATCH / PUT  /api/users/:id

### 1. GET /api/users/
Cookies Required: `access_token=token`
Permissions required: `Admin: true`\
Response (if admin & authorized): 
- An array of user objects
- Each user object has the following keyss:
    - _id
    - firstName
    - lastName
    - employeeNumber
    - email
    - department
    - administrator
    - active
```
[   {
        "_id": "634545435",
        "firstName": "Luke",
        "lastName": "Colcott",
        "employeeNumber": "T12345",
        "email": "l.colcott@live.com",
        "department": "Research and Design",
        "administrator": true,
        "active": true 
    },
   {
        "_id": "13234324",
        "firstName": "Mike",
        "lastName": "Lunchbox",
        "employeeNumber": "T12346",
        "email": "m.lunchbox@live.com",
        "department": "Cars",
        "administrator": true,
        "active": true 
    },
    {
        "_id": "343423432432",
        "firstName": "Buke",
        "lastName": "Bolcott",
        "employeeNumber": "T12315",
        "email": "b.bolcott@live.com",
        "department": "Trucks",
        "administrator": true,
        "active": true 
    },
    {
        "_id": "234324343",
        "firstName": "Duke",
        "lastName": "Dolcott",
        "employeeNumber": "T12347",
        "email": "d.dolcott@live.com",
        "department": "Motorcycles",
        "administrator": true,
        "active": true 
    }
]
```
Response (if not authorized)
```

```

### 2. POST /api/users/login
Headers Required: `None`\
Request:
- Expecting a POST application/json request in the following format:
```
{
    "employeeNumber": "T12345",
    "password"; "password123"
}
```
Response:
- If sucessful login (right passwword, right employee number) amd ACTOVE, returns a JWT with the following payload:
```
{
    "id":  "634545435",
    "admin": true,
}
```
- If INACTIVE but sucessful login (right passwword, right employee number) 
```

```
- If unsucessful login returns (wrong password or wrong employee number)
```
```


### 3. POST /api/users/register
Headers Required: `Authorization: Bearer Token`\
Permissions required: `Admin: true`\
Request:
- Expecting a POST application/json request in the following format:
```
{
    "firstName": "Luke",
    "lastName": "Colcott",
    "employeeNumber": "T12345",
    "email": "l.colcott@live.com",
    "department": "Research and Design",
    "administrator": true,
    "active": true 
}
```
Response:
- If employee is successfully created a json in this format is returned
```
{
    "_id": "634545435",
    "firstName": "Luke",
    "lastName": "Colcott",
    "employeeNumber": "T12345",
    "email": "l.colcott@live.com",
    "department": "Research and Design",
    "administrator": true,
    "active": true 
}
```
- If errors in the form are present json of this format is returned
```
```
- If not authorized, json of this format is returned
```
```


### 4. GET /api/users/current
Headers Required: `Authorization: Bearer Token`\
Response: 
- Object containing details of current user
```
{
    "_id": "634545435",
    "firstName": "Luke",
    "lastName": "Colcott",
    "employeeNumber": "T12345",
    "email": "l.colcott@live.com",
    "department": "Research and Design",
    "administrator": true,
    "active": true 
}
```
- Response if not authorized (if not logged in)
```

```

### 5. GET /api/users/:id
URL parameters required: `:id`, where `:id` is the Toyota Employee Number\
Headers Required: `Authorization: Bearer Token`\
Permissions required: `Admin: true`\
Response: 
- If authorized, an object containing details corresponding to employee number
```
{
    "_id": "634545435",
    "firstName": "Luke",
    "lastName": "Colcott",
    "employeeNumber": "T12345",
    "email": "l.colcott@live.com",
    "department": "Research and Design",
    "administrator": true,
    "active": true 
} 
```
- If id is nout found, this json is returned
```
```
- If not authorized, this json is returned
```
```

### 6. PATCH / PUT  /api/users/:id
URL parameters required: `:id,` where `:id` is the Toyota Employee Number\
Headers Required: `Authorization: Bearer Token`\
Permissions required: `Admin: true`\
Expected Request:
- Expecting an object with the user details required to be updeated
- Expecting a POST application/json request in the following format:
```
{
    "_id": "634545435",
    "firstName": "Luke",
    "lastName": "Colcott",
    "employeeNumber": "T12345",
    "email": "l.colcott@live.com",
    "department": "Research and Design",
    "administrator": true,
    "active": true 
}  
```
Response: 
- If user is successfully updated, returns an object with the updated details in the following format:
```
{
    "_id": "634545435",
    "firstName": "Luke",
    "lastName": "Colcott",
    "employeeNumber": "T12345",
    "email": "l.colcott@live.com",
    "department": "Research and Design",
    "administrator": true,
    "active": true 
}  
```
- If there are errors in the update, this json is returned
```
```
- If not authorized, this json is returned
```
```