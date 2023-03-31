<p align="center">
  <a target="blank"><img src="https://www.pngall.com/wp-content/uploads/10/Pet-PNG-Photo.png" height="200" width="350" alt="CarePet" /></a>
</p>
<h1 align="center">CarePet</h1>

## Description

CarePet is a web application that allows users to monitor their pets' health and well-being. It is a full-stack
application that uses
[NestJS](https://nestjs.com/) for the backend, [Svelte](https://svelte.dev/) for the frontend,
and [ScyllaDB](https://www.scylladb.com/) for the database.

Your task is to set up the database and implement the queries that the backend needs to perform to work properly. You
will be given a
Docker Compose file that will start the backend, frontend, and database for you.

## Installation

### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/) >= 16.0.0
- [NPM](https://www.npmjs.com/get-npm)
- [CQL Shell](https://docs.datastax.com/eol/en/install/6.7/install/installCqlsh.html)

### Clone the repository

```bash
$ git clone https://github.com/CustomEntity/workshop-scylladb.git
$ cd workshop-scylladb
```

### Install dependencies

```bash
$ cd backend
$ npm install

$ cd ..

$ cd frontend
$ npm install
```

### Run everything

Run the following command to start the database:
```bash
$ docker-compose.yml up
```

Run the following command to start the backend:
```bash
$ cd backend
$ npm run start
```

Run the following command to start the frontend:
```bash
$ cd frontend
$ npm run dev
```

## Tasks

### Task 1: Connect to the database using the CQL shell

After starting the Docker Compose file, you should be able to connect to the database using the CQL shell.

### Task 2: Create the keyspace

The keyspace is the top-level container for all data in ScyllaDB. It is similar to a database in other databases.
You have to create a keyspace called `carepet` with a replication factor of 1 and a simple strategy.

### Task 3: Create the tables

You have to create the following tables:
`owner`, `pet`, `sensor`, `measurement`.<br><br>
For the `measurement` table, you have have to use TimeWindowCompactionStrategy compaction strategy.

We will use the following schema: <br><br>
`owner` table: <br>

| Column name     | Type     |
|-----------------|----------|
| owner_id        | UUID     |
| address         | text     |
| name            | text     |
| **PRIMARY KEY** | owner_id |

`pet` table: <br>

| Column name | Type |
|-------------|------|
| owner_id    | UUID |
| pet_id      | UUID |
| chip_id     | text |
| species     | text |
| breed       | text |
| color       | text |
| gender      | text |
| age         | int  |
| weight      | float |
| address     | text |
| name        | text |
| **PRIMARY KEY** | (owner_id, pet_id) |

`sensor` table: <br>

| Column name | Type |
|-------------|------|
| pet_id      | UUID |
| sensor_id   | UUID |
| **PRIMARY KEY** | (pet_id, sensor_id) |

`measurement` table: <br>

| Column name | Type |
|-------------|------|
| sensor_id   | UUID |
| ts          | timestamp |
| value       | float |
| **PRIMARY KEY** | (sensor_id, ts) |
| **Compaction** | TimeWindowCompactionStrategy |

### Task 4: Populate the tables

You have to populate the database using the `npm run populate` command in the `backend` directory.

### Task 5: Implement the queries

You have to implement the queries in the `backend/src/sensor/sensor.service.ts`, `backend/src/pet/pet.service.ts`
and `backend/src/owner/owner.service.ts` files.

