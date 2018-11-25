# Noteful Server

Noteful API

## Live Version

[https://notefulserver.herokuapp.com/](https://notefulserver.herokuapp.com/)

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
│   └── GET
│       └── /
│       └── /first
│       └── /:id
│   └── PATCH
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
Retreives all cards
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

### GET `/api/cards/first`
Retreives user's first card
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

### PATCH `/api/cards/:id`
Retreives card by ID
```js
// req.header
Authorization: Bearer ${token}

// req.body
{
  memory: Number,
  correct: Number,
  total: Number
}

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
