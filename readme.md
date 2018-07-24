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
    "user": {
        "active": true,
        "_id": "5b5410d47d093a520a2edbfa",
        "firstName": "Allen",
        "lastName": "Watts",
        "employeeNumber": "T10004",
        "email": "a.watts@toyota.com.au",
        "department": "Regulations, Conversions & Accessories",
        "administrator": false,
        "__v": 0,
        "fullName": "Allen Watts",
        "id": "5b5410d47d093a520a2edbfa"
    },
    "summarySop": {
        "readSops": [],
        "unreadSops": [
            {
                "_id": "5b52645d34006c0b8115a4b3",
                "title": "Barrr",
                "currentVersion": {
                    "version": 1,
                    "awsPath": "1532126300565-1532125030444-atlassian-git-cheatsheet.pdf"
                }
            }
        ],
        "outdatedSops": []
    }
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
1. GET /api/sops/mysops - Get logged in users SOPs
2. POST /api/sops/
3. GET /api/sops/:id
4. PATCH /api/sops/:id
5. DELETE /api/sops/:id

### GET /api/sops
Cookies Required: `access_token=token`
Permissions required: `Admin: true`
```
[
    {
        "_id": "5b56a7eb72dd911f9e7ff506",
        "title": "Lift Motorcycles",
        "department": "Product Design",
        "currentVersion": {
            "usersRead": [
                "5b5410d47d093a520a2edbf6"
            ],
            "usersRequired": [
                "5b5410d47d093a520a2edbf6"
            ],
            "_id": "5b56a7eb72dd911f9e7ff507",
            "version": 1,
            "author": "Motor Man",
            "createdAt": "2018-07-24T00:00:00.000Z",
            "awsPath": "1532405738468-1532357497180-1532126300565-1532125030444-atlassian-git-cheatsheet.pdf",
            "id": "5b56a7eb72dd911f9e7ff507",
            "currentExpires": "2023-07-24"
        },
        "previousVersions": [],
        "__v": 0
    },
    {
        "_id": "5b56aae572dd911f9e7ff518",
        "title": "New SOP",
        "department": "Vehicle Evaluation",
        "currentVersion": {
            "usersRead": [],
            "usersRequired": [],
            "_id": "5b56aae572dd911f9e7ff519",
            "version": 1,
            "author": "Mary Cooper",
            "createdAt": "2018-07-24T00:00:00.000Z",
            "awsPath": "1532406501220-1532396385150-1532357497180-1532126300565-1532125030444-atlassian-git-cheatsheet.pdf",
            "id": "5b56aae572dd911f9e7ff519",
            "currentExpires": "2023-07-24"
        },
        "previousVersions": [],
        "__v": 0
    },
    {
        "_id": "5b56ab2072dd911f9e7ff51f",
        "title": "New SOP",
        "department": "Regulations, Conversions & Accessories",
        "currentVersion": {
            "usersRead": [],
            "usersRequired": [],
            "_id": "5b56ab2072dd911f9e7ff520",
            "version": 1,
            "author": "Mary Cooper",
            "createdAt": "2018-07-24T00:00:00.000Z",
            "awsPath": "1532406560019-1532357497180-1532126300565-1532125030444-atlassian-git-cheatsheet.pdf",
            "id": "5b56ab2072dd911f9e7ff520",
            "currentExpires": "2023-07-24"
        },
        "previousVersions": [],
        "__v": 0
    },
    {
        "_id": "5b56ab5772dd911f9e7ff527",
        "title": "New SOPd",
        "department": "Regulations, Conversions & Accessories",
        "currentVersion": {
            "usersRead": [],
            "usersRequired": [],
            "_id": "5b56ab5772dd911f9e7ff528",
            "version": 1,
            "author": "Sheldon Cooper",
            "createdAt": "2018-07-24T00:00:00.000Z",
            "awsPath": "1532406615065-1532396385150-1532357497180-1532126300565-1532125030444-atlassian-git-cheatsheet.pdf",
            "id": "5b56ab5772dd911f9e7ff528",
            "currentExpires": "2023-07-24"
        },
        "previousVersions": [],
        "__v": 0
    },
    {
        "_id": "5b56ab8a72dd911f9e7ff530",
        "title": "adsf",
        "department": "Connected Vehicle Services",
        "currentVersion": {
            "usersRead": [],
            "usersRequired": [],
            "_id": "5b56ab8a72dd911f9e7ff531",
            "version": 3,
            "author": "Bill",
            "createdAt": "2018-07-24T00:00:00.000Z",
            "awsPath": "1532406665901-1532396385150-1532357497180-1532126300565-1532125030444-atlassian-git-cheatsheet.pdf",
            "id": "5b56ab8a72dd911f9e7ff531",
            "currentExpires": "2023-07-24"
        },
        "previousVersions": [],
        "__v": 0
    },
    {
        "_id": "5b56abd172dd911f9e7ff53a",
        "title": "Build Houses",
        "department": "Vehicle Evaluation",
        "currentVersion": {
            "usersRead": [],
            "usersRequired": [
                "5b5410d47d093a520a2edbf8",
                "5b5410d47d093a520a2edc25"
            ],
            "_id": "5b56abd172dd911f9e7ff53b",
            "version": 3,
            "author": "Bill Renwick",
            "createdAt": "2018-07-24T00:00:00.000Z",
            "awsPath": "1532406736726-Handling-and-Logging-Errors-Recap.pdf",
            "id": "5b56abd172dd911f9e7ff53b",
            "currentExpires": "2023-07-24"
        },
        "previousVersions": [],
        "__v": 0
    },
    {
        "_id": "5b55eb793e04fb28a119ecbf",
        "title": "Lift Cars",
        "department": "Regulations, Conversions & Accessories",
        "currentVersion": {
            "usersRead": [],
            "usersRequired": [
                "5b5410d47d093a520a2edbf6",
                "5b5410d47d093a520a2edbf9",
                "5b5410d47d093a520a2edc12",
                "5b5410d47d093a520a2edc06",
                "5b5410d47d093a520a2edc28",
                "5b5531ec6018b808e94df2d4",
                "5b5410d47d093a520a2edc03",
                "5b5410d47d093a520a2edc22",
                "5b5410d47d093a520a2edc0c",
                "5b5410d47d093a520a2edc00"
            ],
            "_id": "5b56c8b772dd911f9e7ff642",
            "author": "Sheldon Cooper",
            "createdAt": "2018-07-24T00:00:00.000Z",
            "awsPath": "1532414134535-file.pdf",
            "version": 3,
            "id": "5b56c8b772dd911f9e7ff642",
            "currentExpires": "2023-07-24"
        },
        "previousVersions": [
            {
                "usersRead": [
                    "5b5410d47d093a520a2edbf6"
                ],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edbf9",
                    "5b5410d47d093a520a2edc12",
                    "5b5410d47d093a520a2edc06",
                    "5b5410d47d093a520a2edc28",
                    "5b5531ec6018b808e94df2d4"
                ],
                "_id": "5b55eb793e04fb28a119ecc0",
                "version": 1,
                "author": "Bill Renwick",
                "createdAt": "2018-07-17T00:00:00.000Z",
                "awsPath": "1532357497180-1532126300565-1532125030444-atlassian-git-cheatsheet.pdf",
                "id": "5b55eb793e04fb28a119ecc0",
                "currentExpires": "2023-07-17"
            },
            {
                "usersRead": [
                    "5b5410d47d093a520a2edbf6"
                ],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edbf9",
                    "5b5410d47d093a520a2edc12",
                    "5b5410d47d093a520a2edc06",
                    "5b5410d47d093a520a2edc28",
                    "5b5531ec6018b808e94df2d4",
                    "5b5410d47d093a520a2edc03",
                    "5b5410d47d093a520a2edc22",
                    "5b5410d47d093a520a2edc0c",
                    "5b5410d47d093a520a2edc00"
                ],
                "_id": "5b568367ed7bb4112f7b7fe5",
                "author": "Sheldon Cooper",
                "createdAt": "2018-07-24T00:00:00.000Z",
                "awsPath": "1532396385150-1532357497180-1532126300565-1532125030444-atlassian-git-cheatsheet.pdf",
                "version": 2,
                "id": "5b568367ed7bb4112f7b7fe5",
                "currentExpires": "2023-07-24"
            }
        ],
        "__v": 2
    },
    {
        "_id": "5b52809c7474d61043a11569",
        "title": "Lift Trucks",
        "department": "Regulations, Conversions & Accessories",
        "currentVersion": {
            "usersRead": [
                "5b5410d47d093a520a2edbf6"
            ],
            "usersRequired": [
                "5b5410d47d093a520a2edbf6",
                "5b5410d47d093a520a2edc13",
                "5b5410d47d093a520a2edc1d",
                "5b5410d47d093a520a2edc28",
                "5b5410d47d093a520a2edbf8",
                "5b5410d47d093a520a2edbf7",
                "5b5410d47d093a520a2edbfc",
                "5b5410d47d093a520a2edbfb",
                "5b5410d47d093a520a2edc0f"
            ],
            "_id": "5b557e723e04fb28a119eb6c",
            "author": "Sheldon Cooper",
            "createdAt": "2018-07-23T00:00:00.000Z",
            "awsPath": "1532329585928-Handling-and-Logging-Errors-Recap.pdf",
            "version": 9,
            "id": "5b557e723e04fb28a119eb6c",
            "currentExpires": "2023-07-23"
        },
        "previousVersions": [
            {
                "usersRead": [
                    "5b5410d47d093a520a2edbf6"
                ],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc13",
                    "5b5410d47d093a520a2edc1d",
                    "5b5410d47d093a520a2edc28",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edbf7",
                    "5b5410d47d093a520a2edbfc",
                    "5b5410d47d093a520a2edbfb",
                    "5b5410d47d093a520a2edc0f"
                ],
                "_id": "5b52809c7474d61043a1156a",
                "version": 3,
                "author": "Tom",
                "createdAt": "2018-07-21T00:00:00.000Z",
                "awsPath": "1532133531640-1532125030444-atlassian-git-cheatsheet.pdf",
                "id": "5b52809c7474d61043a1156a",
                "currentExpires": "2023-07-21"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc13",
                    "5b5410d47d093a520a2edc1d",
                    "5b5410d47d093a520a2edc28",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edbf7",
                    "5b5410d47d093a520a2edbfc",
                    "5b5410d47d093a520a2edbfb",
                    "5b5410d47d093a520a2edc0f"
                ],
                "_id": "5b5559c9d3c56119a9d4ae28",
                "author": "Mary Cooper",
                "createdAt": "2018-07-23T00:00:00.000Z",
                "awsPath": "1532320200881-Term 3 Assignment_ Part B and Part C.pdf",
                "version": 4,
                "id": "5b5559c9d3c56119a9d4ae28",
                "currentExpires": "2023-07-23"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc13",
                    "5b5410d47d093a520a2edc1d",
                    "5b5410d47d093a520a2edc28",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edbf7",
                    "5b5410d47d093a520a2edbfc",
                    "5b5410d47d093a520a2edbfb",
                    "5b5410d47d093a520a2edc0f"
                ],
                "_id": "5b55776803ec771a2c50cc0f",
                "author": "Sheldon Cooper",
                "createdAt": "2018-07-16T00:00:00.000Z",
                "awsPath": "1532327782977-Handling-and-Logging-Errors-Recap.pdf",
                "version": 5,
                "id": "5b55776803ec771a2c50cc0f",
                "currentExpires": "2023-07-16"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc13",
                    "5b5410d47d093a520a2edc1d",
                    "5b5410d47d093a520a2edc28",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edbf7",
                    "5b5410d47d093a520a2edbfc",
                    "5b5410d47d093a520a2edbfb",
                    "5b5410d47d093a520a2edc0f"
                ],
                "_id": "5b55776f03ec771a2c50cc12",
                "author": "Sheldon Cooper",
                "createdAt": "2018-07-16T00:00:00.000Z",
                "awsPath": "1532327791024-Handling-and-Logging-Errors-Recap.pdf",
                "version": 6,
                "id": "5b55776f03ec771a2c50cc12",
                "currentExpires": "2023-07-16"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc13",
                    "5b5410d47d093a520a2edc1d",
                    "5b5410d47d093a520a2edc28",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edbf7",
                    "5b5410d47d093a520a2edbfc",
                    "5b5410d47d093a520a2edbfb",
                    "5b5410d47d093a520a2edc0f"
                ],
                "_id": "5b557c153e04fb28a119eb62",
                "author": "Mary Cooper",
                "createdAt": "2018-07-23T00:00:00.000Z",
                "awsPath": "1532328980089-1532133531640-1532125030444-atlassian-git-cheatsheet.pdf",
                "version": 7,
                "id": "5b557c153e04fb28a119eb62",
                "currentExpires": "2023-07-23"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc13",
                    "5b5410d47d093a520a2edc1d",
                    "5b5410d47d093a520a2edc28",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edbf7",
                    "5b5410d47d093a520a2edbfc",
                    "5b5410d47d093a520a2edbfb",
                    "5b5410d47d093a520a2edc0f"
                ],
                "_id": "5b557e323e04fb28a119eb68",
                "author": "Mary Cooper",
                "createdAt": "2018-07-16T00:00:00.000Z",
                "awsPath": "1532329521551-nat12.jpg",
                "version": 8,
                "id": "5b557e323e04fb28a119eb68",
                "currentExpires": "2023-07-16"
            }
        ],
        "__v": 6
    },
    {
        "_id": "5b52645d34006c0b8115a4b3",
        "title": "Barrr",
        "department": "Product Design",
        "currentVersion": {
            "usersRead": [
                "5b5410d47d093a520a2edbf6"
            ],
            "usersRequired": [
                "5b5410d47d093a520a2edbf6",
                "5b5410d47d093a520a2edc1a",
                "5b5410d47d093a520a2edbf8",
                "5b5410d47d093a520a2edc03",
                "5b5410d47d093a520a2edbfd",
                "5b5410d47d093a520a2edc01",
                "5b5410d47d093a520a2edbff",
                "5b5410d47d093a520a2edc21",
                "5b5410d47d093a520a2edc19",
                "5b5410d47d093a520a2edc24",
                "5b5410d47d093a520a2edbf9",
                "5b5410d47d093a520a2edc17",
                "5b5410d47d093a520a2edc20"
            ],
            "_id": "5b55ceb33e04fb28a119ec5f",
            "author": "Bill Renwick",
            "createdAt": "2018-07-23T00:00:00.000Z",
            "awsPath": "1532350130967-Mongoose-Modelling-Relationships-between-Connected-Data-Recap.pdf",
            "version": 8,
            "id": "5b55ceb33e04fb28a119ec5f",
            "currentExpires": "2023-07-23"
        },
        "previousVersions": [
            {
                "usersRead": [
                    "5b5410d47d093a520a2edbf6"
                ],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc1a",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edc03",
                    "5b5410d47d093a520a2edbfd",
                    "5b5410d47d093a520a2edc01",
                    "5b5410d47d093a520a2edbff",
                    "5b5410d47d093a520a2edc21",
                    "5b5410d47d093a520a2edc19",
                    "5b5410d47d093a520a2edc24",
                    "5b5410d47d093a520a2edbf9",
                    "5b5410d47d093a520a2edc17",
                    "5b5410d47d093a520a2edc20"
                ],
                "_id": "5b52645d34006c0b8115a4b4",
                "version": 1,
                "author": "Tom",
                "createdAt": "2018-07-17T00:00:00.000Z",
                "awsPath": "1532126300565-1532125030444-atlassian-git-cheatsheet.pdf",
                "id": "5b52645d34006c0b8115a4b4",
                "currentExpires": "2023-07-17"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc1a",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edc03",
                    "5b5410d47d093a520a2edbfd",
                    "5b5410d47d093a520a2edc01",
                    "5b5410d47d093a520a2edbff",
                    "5b5410d47d093a520a2edc21",
                    "5b5410d47d093a520a2edc19",
                    "5b5410d47d093a520a2edc24",
                    "5b5410d47d093a520a2edbf9",
                    "5b5410d47d093a520a2edc17",
                    "5b5410d47d093a520a2edc20"
                ],
                "_id": "5b55c2133e04fb28a119ec2b",
                "author": "Bill Renwick",
                "createdAt": "2018-07-24T00:00:00.000Z",
                "awsPath": "1532346898752-Mongoose-Modelling-Relationships-between-Connected-Data-Recap.pdf",
                "version": 2,
                "id": "5b55c2133e04fb28a119ec2b",
                "currentExpires": "2023-07-24"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc1a",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edc03",
                    "5b5410d47d093a520a2edbfd",
                    "5b5410d47d093a520a2edc01",
                    "5b5410d47d093a520a2edbff",
                    "5b5410d47d093a520a2edc21",
                    "5b5410d47d093a520a2edc19",
                    "5b5410d47d093a520a2edc24",
                    "5b5410d47d093a520a2edbf9",
                    "5b5410d47d093a520a2edc17",
                    "5b5410d47d093a520a2edc20"
                ],
                "_id": "5b55cb2f3e04fb28a119ec50",
                "author": "Tom Jones",
                "createdAt": "2018-07-23T00:00:00.000Z",
                "awsPath": "1532349230488-Authentication-and-Authorization-Recap.pdf",
                "version": 3,
                "id": "5b55cb2f3e04fb28a119ec50",
                "currentExpires": "2023-07-23"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc1a",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edc03",
                    "5b5410d47d093a520a2edbfd",
                    "5b5410d47d093a520a2edc01",
                    "5b5410d47d093a520a2edbff",
                    "5b5410d47d093a520a2edc21",
                    "5b5410d47d093a520a2edc19",
                    "5b5410d47d093a520a2edc24",
                    "5b5410d47d093a520a2edbf9",
                    "5b5410d47d093a520a2edc17",
                    "5b5410d47d093a520a2edc20"
                ],
                "_id": "5b55cc273e04fb28a119ec53",
                "author": "Mary Cooper",
                "createdAt": "2018-07-23T00:00:00.000Z",
                "awsPath": "1532349479300-1532346898752-Mongoose-Modelling-Relationships-between-Connected-Data-Recap.pdf",
                "version": 4,
                "id": "5b55cc273e04fb28a119ec53",
                "currentExpires": "2023-07-23"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc1a",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edc03",
                    "5b5410d47d093a520a2edbfd",
                    "5b5410d47d093a520a2edc01",
                    "5b5410d47d093a520a2edbff",
                    "5b5410d47d093a520a2edc21",
                    "5b5410d47d093a520a2edc19",
                    "5b5410d47d093a520a2edc24",
                    "5b5410d47d093a520a2edbf9",
                    "5b5410d47d093a520a2edc17",
                    "5b5410d47d093a520a2edc20"
                ],
                "_id": "5b55cd1e3e04fb28a119ec56",
                "author": "Tom",
                "createdAt": "2018-07-23T00:00:00.000Z",
                "awsPath": "1532349726276-nat12.jpg",
                "version": 5,
                "id": "5b55cd1e3e04fb28a119ec56",
                "currentExpires": "2023-07-23"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc1a",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edc03",
                    "5b5410d47d093a520a2edbfd",
                    "5b5410d47d093a520a2edc01",
                    "5b5410d47d093a520a2edbff",
                    "5b5410d47d093a520a2edc21",
                    "5b5410d47d093a520a2edc19",
                    "5b5410d47d093a520a2edc24",
                    "5b5410d47d093a520a2edbf9",
                    "5b5410d47d093a520a2edc17",
                    "5b5410d47d093a520a2edc20"
                ],
                "_id": "5b55cd7e3e04fb28a119ec59",
                "author": "Sheldon Cooper",
                "createdAt": "2018-07-23T00:00:00.000Z",
                "awsPath": "1532349822253-Mongoose-Modelling-Relationships-between-Connected-Data-Recap.pdf",
                "version": 6,
                "id": "5b55cd7e3e04fb28a119ec59",
                "currentExpires": "2023-07-23"
            },
            {
                "usersRead": [],
                "usersRequired": [
                    "5b5410d47d093a520a2edbf6",
                    "5b5410d47d093a520a2edc1a",
                    "5b5410d47d093a520a2edbf8",
                    "5b5410d47d093a520a2edc03",
                    "5b5410d47d093a520a2edbfd",
                    "5b5410d47d093a520a2edc01",
                    "5b5410d47d093a520a2edbff",
                    "5b5410d47d093a520a2edc21",
                    "5b5410d47d093a520a2edc19",
                    "5b5410d47d093a520a2edc24",
                    "5b5410d47d093a520a2edbf9",
                    "5b5410d47d093a520a2edc17",
                    "5b5410d47d093a520a2edc20"
                ],
                "_id": "5b55ce4d3e04fb28a119ec5c",
                "author": "Bill Renwick",
                "createdAt": "2018-07-23T00:00:00.000Z",
                "awsPath": "1532350029203-Authentication-and-Authorization-Recap.pdf",
                "version": 7,
                "id": "5b55ce4d3e04fb28a119ec5c",
                "currentExpires": "2023-07-23"
            }
        ],
        "__v": 7
    }
]
```

If database query fails returns status 500
```
{errors: {'sops': 'Unable to find sops'}}
```

### GET /api/mysops
```
{
    "readSops": [
        {
            "_id": "5b52645d34006c0b8115a4b3",
            "title": "Barrr",
            "currentVersion": {
                "version": 1,
                "awsPath": "1532126300565-1532125030444-atlassian-git-cheatsheet.pdf"
            }
        }
    ],
    "unreadSops": [
        {
            "_id": "5b52809c7474d61043a11569",
            "title": "Lift Trucks",
            "currentVersion": {
                "version": 3,
                "awsPath": "1532133531640-1532125030444-atlassian-git-cheatsheet.pdf"
            }
        }
    ],
    "outdatedSops": []
}
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
