# CodicaT
Test job for Codica

## Run

###### Use node version v18.11.0

#### Create .env file in base directory
```dotenv
    #api
    PORT="5600"

    #db
    DB_HOST="localhost"
    DB_PORT=5432
    POSTGRES_DB="finances"
    POSTGRES_USER="root"
    POSTGRES_PASSWORD="root"
    PGADMIN_EMAIL="pgadmin@pgadmin.com"
    PGADMIN_ADMIN="root"
    PGADMIN_PASSWORD="root"
    PGADMIN_PORT=5050
```

#### Up docker compose container
```bash
    docker compose up
```

#### Run [init.sql](db/init.sql) script for db
I'm using IDEA Database query for it
###### for some reasons db doesn't save after restart docker

#### Install dependencies
```bash
    npm install
```

#### Run app
```bash
    npm run dev
```


# API Doc
###### You can use Postman [collection](data/CodicaT.postman_collection.json)

## Bank

### GetAll
    GET: http://localhost:5600/bank
```text
> returns:
{
    "status": "OK",
    "data": [
        {
            "id": 1,
            "name": "Default Bank",
            "balance": 999999,
            "createdAt": "2023-01-29T07:36:12.666Z",
            "updatedAt": "2023-01-29T07:36:12.666Z"
        },
        ...
    ]
}
```

### GetOne
    GET: http://localhost:5600/bank/id?id=<bankId>
```text
> sample:
http://localhost:5600/bank/id?id=1

> returns:
{
    "status": "OK",
    "data": {
        "id": <bankId>,
        "name": "<bankName>",
        "balance": <bankBalance>,
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>"
    }
}
```

### AddNew
    POST: http://localhost:5600/bank
```text
> body:
{
    "data": {
        "name": "<bankName>",
        "balance": "<bankBalance>"
    }
}

> sample:
{
    "data": {
        "name": "My name Bank",
        "balance": "55"
    }
}

> returns:
code: 200
{
    "status": "OK",
    "data": {
        "id": <bankId>,
        "name": "<bankName>",
        "balance": <bankBalance>,
        "updatedAt": "<timestamp>",
        "createdAt": "<timestamp>"
    }
}
```

### Update
    POST: http://localhost:5600/bank/update
```text
> body:
{
    "data": {
        "id": "<bankId>",
        "name": "<bankName>", #optional
        "balance": "<bankBalance>" #optional
    }
}
#at least one of optional required

> sample:
{
    "data": {
        "id": "1",
        "name": "My new name Bank",
    }
}

> returns:
code: 200
{
    "status": "OK",
    "data": {
        "affected": [
            <affectedNumber>
        ]
    }
}

```

### Delete
    DELETE: http://localhost:5600/bank
```text
> body:
{
    "data": {
        "id": "<bankId>"
    }
}

> sample:
{
    "data": {
        "id": "4"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "affected": <affectedNumber>
    }
}

```

### Explanations
```text
<bankId> - number - bank ID
<bankName> - string - bank Name
<bankBalance> - number - balance of bank
```

## Category
#### GetAll
    GET: http://localhost:5600/category
```text
> returns:
{
    "status": "OK",
    "data": [
        {
            "id": <categoryId>,
            "name": "<categoryName>"
        },
        ...
    ]
}
```
#### GetOne
    GET: http://localhost:5600/category/id?id=<categoryId>
```text
> sample:
http://localhost:5600/category/id?id=1

> returns:
{
    "status": "OK",
    "data": {
        "id": <categoryId>,
        "name": "<categoryName>"
    }
}
```
#### AddNew
    POST: http://localhost:5600/category
```text
> body:
{
    "data": {
        "name": "<categoryName>"
    }
}
#all names must be unique

> sample:
{
    "data": {
        "name": "New Category"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "id": <categoryId>,
        "name": "<categoryName>"
    }
}
```
#### Update
    POST: http://localhost:5600/category/update
```text
> body:
{
    "data": {
        "id": "<categoryId>",
        "name": "<categoryName>"
    }
}

> sample:
{
    "data": {
        "id": "2",
        "name": "New Name Category"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "affected": [
            <affectedNumber>
        ]
    }
}
```
#### Delete
    DELETE: http://localhost:5600/category
```text
> body:
{
    "data": {
        "id": "<categoryId>"
    }
}

> sample:
{
    "data": {
        "id": "2"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "affected": <affectedNumber>
    }
}
```

### Explanations
```text
<categoryId> - number - category ID
<categoryName> - string - category name
```

## Status
#### GetAll
    GET: http://localhost:5600/status
```text
> returns:
{
    "status": "OK",
    "data": [
        {
            "id": <statusId>,
            "name": "<statusName>"
        },
        ...
    ]
}
```
#### GetOne
    GET: http://localhost:5600/status/id?id=<statusId>
```text
> sample:
http://localhost:5600/status/id?id=1

> returns:
{
    "status": "OK",
    "data": {
        "id": <statusId>,
        "name": "<statusName>"
    }
}
```
#### AddNew
    POST: http://localhost:5600/status
```text
> body:
{
    "data": {
        "name": "<statusName>"
    }
}
#all names must be unique

> sample:
{
    "data": {
        "name": "New Status"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "id": <statusId>,
        "name": "<statusName>"
    }
}
```
#### Update
    POST: http://localhost:5600/status/update
```text
> body:
{
    "data": {
        "id": "<statusId>",
        "name": "<statusName>"
    }
}

> sample:
{
    "data": {
        "id": "2",
        "name": "New Name Status"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "affected": [
            <affectedNumber>
        ]
    }
}
```
#### Delete
    DELETE: http://localhost:5600/status
```text
> body:
{
    "data": {
        "id": "<statusId>"
    }
}

> sample:
{
    "data": {
        "id": "2"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "affected": <affectedNumber>
    }
}
```

### Explanations
```text
<statusId> - number - status ID
<statusName> - string - status name
```

## Transactions
#### GetAll
    GET: http://localhost:5600/transactions
```text
> returns:
{
    "status": "OK",
    "data": [
        {
            "id": <transactionId>,
            "bankId": <bankId>,
            "amount": <transactionAmount>,
            "categories": [
                "<categoryName>",
                ...
            ],
            "status": "<statusName>",
            "createdAt": "<timestamp>",
            "updatedAt": "<timestamp>"
        },
        ...
    ]
}
```
#### GetAllPagi
    GET: http://localhost:5600/transactions/pagi?limit=<limit>&offset=<offset>
```text
> sample:
http://localhost:5600/transactions/pagi?limit=5&offset=3

> returns:
{
    "status": "OK",
    "data": [
        {
            "id": <transactionId>,
            "bankId": <bankId>,
            "amount": <transactionAmount>,
            "categories": [
                "<categoryName>",
                ...
            ],
            "status": "<statusName>",
            "createdAt": "<timestamp>",
            "updatedAt": "<timestamp>"
        },
        ...
    ]
}
```
#### GetSize
    GET: http://localhost:5600/transactions/size
```text
> returns:
{
    "status": "OK",
    "data": {
        "count": "<transactionsCount>"
    }
}
```
#### GetOne
    GET: http://localhost:5600/transactions/id?id=<transactionId>
```text
> sample:
http://localhost:5600/transactions/id?id=1

> returns:
{
    "status": "OK",
    "data": {
        "id": <transactionId>,
        "bankId": <bankId>,
        "amount": <transactionAmount>,
        "categories": [
            "<categoryName>",
            ...
        ],
        "status": "<statusName>",
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>"
    }
}
```
#### AddNew
    POST: http://localhost:5600/transactions
```text
> body:
{
    "data": {
        "bankId": "<bankId>",
        "amount": "<transactionAmount>",
        "categories": [
            "<categoryName>",
            ...
        ],
        "status": "<statusName>"
    }
}

> sample:
{
    "data": {
        "bankId": "2",
        "amount": "-5",
        "categories": [
            "Default category"
        ],
        "status": "Default status"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "id": <transactionId>,
        "bankId": <bankId>,
        "amount": <transactionAmount>,
        "categories": [
            "<categoryName>",
            ...
        ],
        "status": "<statusName>",
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>"
    }
}
```
#### Update
    POST: http://localhost:5600/transactions/update
```text
> body:
{
    "data": {
        "bankId": "<bankId>",
        "amount": "<transactionAmount>", #optional
        "categories": [ #optional
            "<categoryName>",
            ...
        ],
        "status": "<statusName>" #optional
    }
}
#at least one of optional required

> sample:
{
    "data": {
        "id": "5",
        "amount": "35",
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "affected": [
            <affectedNumber>
        ]
    }
}
```
#### Delete
    DELETE: http://localhost:5600/transactions
```text
> body:
{
    "data": {
        "id": "<transactionId>"
    }
}

> sample:
{
    "data": {
        "id": "5"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "affected": <affectedNumber>
    }
}
```

### Explanations
```text
<transactionId> - number - transaction ID
<bankId> - number - referenced bank ID
<transactionAmount> - number - amount of transaction (+ for add, - for spend)
<categoryName> - string - referenced category name
<statusName> - string - referenced status name
<limit> - number - count of expected transactions
<offset> - number - skip <offset> transactions
<transactionsCount> - number - count of all transactions (use for pagination)
```

## Stats
#### GetStats
    http://localhost:5600/stats
```text
> body:
{
    "data": {
        "categories": [
            <categoryId>,
            ...
        ],
        "fromPeriod": "<timestamp>",
        "toPeriod": "<timestamp>"
    }
}

> sample:
{
    "data": {
        "categories": [
            1,
            2
        ],
        "fromPeriod": "2023-01-29 10:04:44.256000",
        "toPeriod": "2023-01-29 10:04:50.414000"
    }
}

> returns:
{
    "status": "OK",
    "data": {
        "<categoryName>": <sumOfTransactions>,
        ...
    }
}
```

### Explanations
```text
<categoryName> - string - name of category
<sumOfTransactions> - number - how many you spend/got from category (from/to)
<categoryId> - number - id of chosen category
```

## Errors
```text
>> errors:
>>> data error: #when you miss some data or give bad data (values, types etc)
code: 400
{
    "status": "BAD_REQUEST",
    "data": {
        "message": "<errorMessage>"
    }
}
>>> unexpected error: #to handle all another errors like DB errors
code: 200
{
    "status": "ERROR",
    "data": {
        "message": "<errorMessage>"
    }
}
```

### Explanations
```text
<errorMessage> - string - message about error
<affectedNumber> - number - count of affected rows
<timestamp> - timestamp - sample: 2023-01-29T07:36:13.080Z
```