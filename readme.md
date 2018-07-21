# BACKEND API ENDPOINTS

## Users
------
API Routes: 
1. GET /api/users/ 
2. POST /api/users/login 
3. POST /api/users/register
4. GET /api/users/me
5. GET /api/users/:id
6. PATCH /api/users/:id
7. PATCH /api/users/:id/password
8. PATCH /api/users/password

### AUTH ERRORS
If user is not logged in to user-authed endpoint - 401
```
{'errors': {'Unauthorized': 'Access denied'}}
```
If user does not have admin access to admin-authed endpoint - 403
```
{'errors': {'Unauthorized': 'Access denied'}}
```
If user has invalid token - 400
```
{'errors': {'Bad Request': 'Invalid token'}}
```


### 1. GET /api/users/
Cookies Required: `access_token=token`\
Permissions required: `Admin: true`\
Response (if admin & authorized): 
- An array of user objects
- Each user object has the following keys:
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

### 2. POST /api/users/login
Cookies Required: `None`\
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
- If INACTIVE but sucessful login (right password, right employee number) 
```

```
- If unsucessful login returns (wrong password or wrong employee number)
```
{
    errors: "Invalid Employee Number or Password"
}
```


### 3. POST /api/users/register
Cookies Required: `access_token=token`\
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
{
    "errors": {
        "firstName": "First name must be between 2 and 30 characters",
        "email": "A user with that email already exists",
        "employeeNumber": "A user with that employee number already exists"
    }
}
```

### 4. GET /api/users/me
Cookies Required: `access_token=token`\
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

### 5. GET /api/users/:id
URL parameters required: `:id,` where `:id` is the mongoose `_id` of the user
Cookies Required: `access_token=token`\
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
- If user with `:id` is not found, this json is returned , with status 404
```
{
    "errors": {
        "user": "Unable to find user"
    }
}
```
- If there are errors in form, json int he following format is returned, with status 400
```
{
    "errors": {
    "firstName": "First name field is required",
    "lastName": "Last name field is required",
    "employeeNumber": "Please select a department",
    "password": "Password must be at least 6 characters",
    "email": "Email is invalid",
    "password2": "Confirm Password field is required"
    }
}
```

### 6. PATCH /api/users/:id
URL parameters required: `:id,` where `:id` is the mongoose `_id` of the user\
Cookies Required: `access_token=token`\
Permissions required: `Admin: true`\
Expected Request:
- Expecting an object with the user details required to be updeated
- Expecting a PATCH application/json request in the following format:
```
{
    "firstName": "zo",
    "lastName": "zolcott",
    "employeeNumber": "T12349",
    "email": "b.bolcott@live.com",
    "department": "Research and Design",
    "administrator": false,
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
- If there are errors in the form, this json is returned with status 400
```
{
    "errors": {
    "firstName": "First name field is required",
    "lastName": "Last name field is required",
    "employeeNumber": "Please select a department",
    "password": "Password must be at least 6 characters",
    "email": "Email is invalid",
    "password2": "Confirm Password field is required"
    }
}
```
- If user was unable to be updated, this json is returned with status 500
```
{
    "errors": {
        "error": "E11000 duplicate key error index: toyota.users.$employeeNumber_1 dup key: { : \"T12346\" }"
    }
}
```

### 7. PATCH /api/users/:id/password
URL parameters required: `:id,` where `:id` is the mongoose `_id` of the user\
Cookies Required: `access_token=token`\
Permissions required: `Admin: true`
```
{
    "password1": "newpass789",
    "password2": "newpass789",
}
```

### 8. PATCH /api/users/password
Cookies Required: `access_token=token`
- Expecting a PATCH application/json request in the following format:
```
{
    "oldPassword": "password123",
    "password1": "newpass789",
    "password2": "newpass789",
}
```

## SOPS
------
1. GET /api/sops/ - Get All SOPS
2. POST /api/sops
3. GET /api/sops/:id
4. PATCH /api/sops/:id
5. DELETE /api/sops/:id

### GET /api/sops
```
```

### POST /api/sops
```
```

### GET /api/sops
```
```

### PATCH /api/sops
```
```

### DELETE /api/sops
```
```
