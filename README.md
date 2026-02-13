# Task Management API

> A RESTful API built with NestJS for managing tasks with MongoDB integration and in-memory fallback support.

**Short Summary:** During the development process, I used AI tools to write the unit tests, implemented a fallback repository pattern to ensure architectural flexibility and also creating this README.md file's structure. Previously, I built layered architecture project in Express.js where I manually handled Dependency Injection (DI) this time I decided to try NestJS. NestJS's IoC system provides automatically managing DI and Providers. My background in Java Spring, Express.js and TypeScript allowed me to quickly adapt to NestJS core concepts. While the project wasn't challenging, it provided a valuable opportunity to get familiar with the NestJS ecosystem.

I followed this plan to implement this api:

1.day: Read NestJS documentation and understand the core concepts.
2.day: Implement the layered architecure (Controller, Service, Repository, MongoDB implementation).
3.day: Implement the fallback repository pattern, test endpoints via Postman, create unit tests and add Docker support.

**Note**: All endpoints are validated using Postman to ensure system reliability.

## Features

- **CRUD Operations** - Create and retrieve tasks
- **MongoDB Integration** - Persistent storage with Mongoose
- **In-Memory Fallback** - Automatic fallback when database is unavailable
- **Input Validation** - Request validation using class-validator
- **Global Exception Handling** - Centralized error handling
- **Docker Support** - Containerized deployment
- **Unit Tests** - Comprehensive test coverage
- **TypeScript** - Full type safety

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Technologies](#technologies)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)

## Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 8.x
- **MongoDB** (optional - falls back to in-memory storage)
- **Docker** (optional - for containerized deployment)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd task-management-api

# Install dependencies
pnpm install
```

## Configuration

Create a `.env.development` file in the root directory:

```env.development
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-management-api?retryWrites=true&w=majority
```

### Environment Variables

| Variable    | Description               | Default  |
| ----------- | ------------------------- | -------- |
| `PORT`      | Server port               | `3000`   |
| `MONGO_URI` | MongoDB connection string | Optional |

> **Note:** If `MONGO_URI` is not provided, the API will use in-memory storage.

## Running the Application

### Development Mode

```bash
# Start with hot-reload
pnpm run start:dev
```

### Production Mode

```bash
# Build the application
pnpm run build

# Start production server
pnpm run start:prod
```

### Debug Mode

```bash
pnpm run start:debug
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints

#### Get All Tasks

```http
GET /tasks
```

**Response:**

```json
{
  "success": true,
  "error": false,
  "statusCode": 200,
  "message": "Tasks fetched successfully",
  "data": [
    {
      "title": "Sample Task",
      "completed": false,
      "createdAt": "timestamp"
    }
  ]
}
```

#### Create Task

```http
POST /tasks
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "New Task",
  "completed": false
}
```

**Response:**

```json
{
  "success": true,
  "error": false,
  "statusCode": 201,
  "message": "Task created successfully",
  "data": {
    "title": "New Task",
    "completed": false,
    "createdAt": "timestamp"
  }
}
```

**Error Response (Duplicate Task):**

```json
{
  "success": false,
  "error": true,
  "statusCode": 400,
  "timestamp": "timestamp",
  "path": "path",
  "message": "Task already exists 'Repository Name'"
}
```

## Testing

```bash
# Run unit tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Generate test coverage
pnpm run test:cov

```

### Test Coverage

The project includes comprehensive unit tests for:

- **TaskService** - Business logic testing
- **TaskController** - HTTP endpoint testing

## Docker Deployment

### Build Docker Image

```bash
docker build -t task-management-api .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  --env-file .env.development or .env \
  task-management-api
```

## Project Structure

```
task-management-api/
├── src/
│   ├── common/
│   │   └── filters/
│   │       └── all-exceptions.filters.ts
│   ├── task/
│   │   ├── controller/
│   │   │   ├── task.controller.ts
│   │   │   └── task.controller.spec.ts
│   │   ├── dto/
│   │   │   ├── create-task.dto.ts
│   │   │   ├── response-message.dto.ts
│   │   │   └── response-task.dto.ts
│   │   ├── entity/
│   │   │   ├── task.entity.ts
│   │   │   └── in-memory-task.entity.ts
│   │   ├── interfaces/
│   │   │   └── task.interface.ts
│   │   ├── repository/
│   │   │   ├── mongo-tasks.repository.ts
│   │   │   └── in-memory-tasks.repository.ts
│   │   ├── service/
│   │   │   ├── task.service.ts
│   │   │   └── task.service.spec.ts
│   │   └── task.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .dockerignore
├── Dockerfile
├── package.json
└── README.md
```

## Technologies

### Core

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript
- **[Node.js](https://nodejs.org/)** - Runtime environment

### Database

- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB ODM

### Validation & Transformation

- **[class-validator](https://github.com/typestack/class-validator)** - Decorator-based validation
- **[class-transformer](https://github.com/typestack/class-transformer)** - Object transformation

### Testing

- **[Jest](https://jestjs.io/)** - Testing framework
- **[Supertest](https://github.com/visionmedia/supertest)** - HTTP assertions

## Architecture

The application follows a **layered architecture** pattern:

```
Controller Layer → Service Layer → Repository Layer → Database
```

- **Controller**: Handles HTTP requests and responses
- **Service**: Contains business logic
- **Repository**: Abstracts data access (MongoDB or In-Memory)
- **DTO**: Data Transfer Objects for validation

### Repository Pattern

The app uses the **Repository Pattern** with two implementations:

1. `MongoTaskRepository` - MongoDB persistence
2. `InMemoryTaskRepository` - In-memory fallback

The active repository is determined at runtime based on MongoDB availability.

## API Response Format

All endpoints follow a consistent response structure:

```typescript
{
  success: boolean;      // Operation success status
  error: boolean;        // Error flag
  statusCode: number;    // HTTP status code
  message: string;       // Human-readable message
  data: T | T[];        // Response payload
}
```

## Error Handling

The API includes a global exception filter that catches all errors and returns a standardized error response:

```json
{
  "success": false,
  "error": true,
  "statusCode": 400,
  "timestamp": "timestamp",
  "path": "path",
  "message": "Error description"
}
```
