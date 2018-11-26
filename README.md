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
```

### POST `/api/auth/login`
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
```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  authToken: String
}
```

### POST `/api/users/`
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
