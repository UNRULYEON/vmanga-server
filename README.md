# vmanga-server

vmanga server

## Running the project

You can develop with:

- [Docker (recommended)](#docker)
- [Vanilla](#vanilla)

### Docker

Developing with Docker is the recommended workflow.

#### Prerequisites

- Docker Desktop

#### Setup

1. Make sure Docker is running
2. Update the values between `<>`. The `DATABASE_URL` is `postgres://vmanga:vmanga@postgres:5432/vmanga`
3. Run this command in the root of the project:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This setup is enabled with hot reloading, so there is no need to restart the images to get the latest changes. The server will be available on port `3000` if no `PORT` has been set in the `.env` file.

Connecting with a client to the PostgreSQL database can be done with the following connection details:

| Key      | Value       |
| -------- | ----------- |
| host     | `localhost` |
| port     | `6543`      |
| username | `vmanga`    |
| password | `vmanga`    |
| database | `vmanga`    |

---

### Vanilla

Developing vanilla is always possible when Docker doesn't work or is not preferred.

#### Prerequisites

- Node `v14.16.1`
- Yarn `1.22.10`
- NVM

#### Setup

1. Use the Node version the project uses with nvm:

```bash
nvm use
```

2. Install packages with:

```bash
yarn
```

3. Create a `.env.local` and copy the contents of `.env.development` into it.
4. Make sure you have an user setup that can connect to PostgreSQL, for example:

| Key      | Value    |
| -------- | -------- |
| username | `vmanga` |
| password | `vmanga` |
| database | `vmanga` |

5. Update the values between `<>`
6. Run the project with:

```bash
yarn dev
```
