# Echo

![Webpage Screenshot](images/Image.png)

A full-stack website where visiting guests can read and leave short notes/thoughts.

## Tech Stack

- **Backend:** Spring Boot (Java 21) with Maven and Docker
- **Database:** MongoDB (run locally)
- **Frontend:** React (Vite + TypeScript) + TailwindCSS

## Quick Start

### Prerequisites

- Docker & Docker Compose (for backend + MongoDB)
- Node.js 24+ and npm (for frontend)

### Running Backend with Docker

```bash
docker-compose up
```

Backend runs at http://localhost:8080, MongoDB at localhost:27017.

### Running Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Or expose to network
npm run dev-host
```

Frontend runs at http://localhost:5173

### Running Backend Locally (without Docker)

This is for folks who prefer the traditional approach without Docker.

**Prerequisites:** Java 21, Maven

```bash
cd backend
./mvnw clean package
java -jar target/echo-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

Set environment variables for MongoDB connection, CORS origins, and IP salt.

## API Endpoints

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| GET    | `/api/v1/notes`        | List notes (paginated) |
| POST   | `/api/v1/notes`        | Create a note          |
| GET    | `/api/v1/notes/{id}`   | Get a single note      |
| GET    | `/actuator/health`     | Health check           |
| GET    | `/actuator/prometheus` | Prometheus metrics     |

### Query Parameters for GET /api/v1/notes

- `page` - Page number (default: 0)
- `size` - Page size (default: 20, max: 100)
- `sort` - Sort field and direction (default: `createdAt, desc`)

### Create Note Request

```json
{
  "message": "Your message here (required, 1-1000 chars)",
  "author": "Your name (optional, max 100 chars)"
}
```

## VS Code Setup

### Java Extension Pack

Install the "Extension Pack for Java" from Microsoft for Java development support.

### Environment Variables in VS Code

Create a `.vscode/launch.json` for running with environment variables:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "EchoApplication",
      "request": "launch",
      "mainClass": "com.echo.app.EchoApplication",
      "projectName": "echo-backend",
      "env": {
        "ECHO_MONGO_URI": "mongodb://localhost:27017/echo",
        "ECHO_CORS_ORIGINS": "http://localhost:5173",
        "ECHO_IP_SALT": "dev-salt-change-in-prod",
        "SPRING_PROFILES_ACTIVE": "dev"
      }
    }
  ]
}
```


## License

MIT © [MartelleV](https://github.com/MartelleV).
