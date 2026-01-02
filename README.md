# TuneLink GraphQL

GraphQL backend for TuneLink. This repository is part of the [TuneLink project](https://github.com/timex05/tunelink).

## About

TuneLink GraphQL is a small, self-hosted GraphQL API built with Node.js, Express, Apollo Server and Prisma. It provides a backend for user profiles, comments, likes, newsletters and simple linktree-style content with a focus on ease of development and local preview.

## Key Features

- GraphQL API implemented with **Apollo Server** and **Express**
- Database access via **Prisma** (SQL Database)
- Models and resolvers for **Users**, **Comments**, **Likes**, **Newsletter** and **Linktree**
- Simple local development workflow and automatic Prisma client generation

## Requirements

- Node.js 16 or newer
- npm or yarn
- A database supported by Prisma (e.g. SQLite for local development or PostgreSQL for production)
- A `.env` file with a `DATABASE_URL` (e.g. `DATABASE_URL="file:./dev.db"` for SQLite)

## Local preview

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/timex05/tunelink-graphql.git
   cd tunelink-graphql
   npm install
   ```

2. Add a `.env` file and set `DATABASE_URL` (example for SQLite):

   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

4. (Optional) Run migrations if you use them:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the GraphQL endpoint in your browser or GraphQL client:

   ```text
   http://localhost:3000/graphql
   ```

Tip: Set `PORT` in your `.env` to change the server port.

## License

See the `LICENSE` file in this repository.

## References

### Main

- [Main TuneLink project](https://github.com/timex05/tunelink-main)

### Frontend

- [TuneLink Mulit Page Application (mpa)](https://github.com/timex05/tunelink-mpa)
- [TuneLink Single Page Application (spa)](https://github.com/timex05/tunelink-spa)
- [TuneLink Static Files](https://github.com/timex05/tunelink-static)

### Backend

- [TuneLink REST-Api](https://github.com/timex05/tunelink-rest)

### GraphQL
- [TuneLink GraphQL](https://github.com/timex05/tunelink-graphql)