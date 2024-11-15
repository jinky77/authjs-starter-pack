# SaaS Template

This project provides a starter pack for building web applications with AuthJS, Prisma, bun and the shadcn UI library.

## Features

- **Authentication**: Auth.js. Logic for `Credentials` (email/password) is NOT implemented.
- **Database**: Prisma ORM.
- **UI Library**: shadcn UI components.
- **Routing**: Next.js file-based routing.
- **Styling**: Tailwind CSS.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 14 or higher
- [bun](https://bun.sh/) package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jinky77/authjs-starter-pack.git
```

2. Install dependencies:

```bash
cd authjs-starter-pack
bun install
```

3. Set up the environment variables:

```bash
cp .env.example .env.local
```

Then, update the `.env` file with your specific authentication provider credentials. See [Auth.js installation guide](https://authjs.dev/getting-started) for reference.

4. Set up the database:

For a local database, install [Docker](https://docs.docker.com/engine/install/). For hosted Postgres in Next.js, see: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres).

Assuming you're setting up a local database:

```bash
docker run --name YOUR_DB_NAME -p YOUR_DB_PORT:5432 -e POSTGRES_PASSWORD=YOUR_DB_PASSWORD -d postgres:latest
```

Update your `.env.local` file with the correct `DATABASE_URL` variable.

5. Migrate database schema with Prisma:

```bash
bunx prisma migrate dev --name init
```

Regenerate Prisma Client:

```bash
bunx prisma generate
```

6. Start the development server:

```bash
bun dev
```

The application will be available at `http://localhost:3000`.

### License

This project is licensed under the [MIT License](LICENSE).
