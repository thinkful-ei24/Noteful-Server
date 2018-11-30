# Noteful Server

Noteful API

## Live Version

[https://notefulserver.herokuapp.com/](https://notefulserver.herokuapp.com/)

## Instructions for Reuse
- To get started, clone this repo and run `npm install`

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
Retreives all of user's cards
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
Retreives user's first card (head)
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
Edits card by ID
```js
// req.header
Authorization: Bearer ${token}

// req.body
{
  memory: Number,
  correct: Number,
  total: Number
}

// res (No Content)
```

## Built With

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/) - Data collection
* [Mongoose](https://mongoosejs.com/) - Object Modeling
* [MongoDB](https://www.mongodb.com/) - Database

## Authors
* **Kent Tokunaga** - [kenttoku](https://github.com/kenttoku)
* **Chelsea Kent** - [clkent](https://github.com/clkent)
* **Shane Lupton** - [slupton89](https://github.com/slupton89)
