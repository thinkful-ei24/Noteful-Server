# Noteful Server

Noteful API

## API Overview

```text
/api
.
├── /auth
│   └── POST
│       ├── /login
│       └── /refresh
├── /users
│   └── POST
│       └── /
├── /cards
│   └── Get
│       └── /
│       └── /:id
```

### POST `/api/auth/login`
Login user
```js
// req.body
{
  username: String,
  password: String
}

// res.body
{
  authToken: String
}
```

### POST `/api/auth/refresh`
Refresh JWT
```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  authToken: String
}
```

### POST `/api/users/`
Create user
```js
// req.body
{
  name: String,
  username: String,
  password: String
}

// res.body
{
  name: String,
  username: String
}
```

### GET `/api/cards/`
Retreives all card
```js
// req.header
Authorization: Bearer ${token}

// res.body
[
  {
    userId: String,
    note: String,
    memory: Number,
    next: String,
    correct: Number,
    total: Number
  }
]
```


### GET `/api/cards/:id`
Retreives card by ID
```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  userId: String,
  note: String,
  memory: Number,
  next: String,
  correct: Number,
  total: Number
}
```