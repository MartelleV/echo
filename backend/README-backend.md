# Echo Backend

Spring Boot backend for the Echo application.

## Requirements

- Docker & Docker Compose (recommended for development)
- Or: Java 21 + Maven for local development

## Build & Run

### Deploy with Docker

From the root directory:

```bash
docker compose up
```

Backend runs at http://localhost:8080. MongoDB is provisioned automatically.

### Local Development without Docker

**Prerequisites:** Java 21, Maven

```bash
# Build
./mvnw clean package

# Run with dev profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Set environment variables:

```bash
export ECHO_MONGO_URI=mongodb://localhost:27017/echo
export ECHO_CORS_ORIGINS=http://localhost:5173
export ECHO_IP_SALT=dev-salt-change-in-prod
```

Or create `.env` and source it. MongoDB must be running separately.

## Environment Variables

| Variable                        | Required?  | Default                           | Description                          |
|---------------------------------|------------|-----------------------------------|--------------------------------------|
| `ECHO_MONGO_URI`                | Yes (prod) | `mongodb://localhost:27017/echo`  | MongoDB connection URI               |
| `ECHO_CORS_ORIGINS`             | Yes (prod) | `http://localhost:5173`           | Comma-separated allowed CORS origins |
| `ECHO_IP_SALT`                  | Yes (prod) | `default-dev-salt-change-me`      | Random salt for IP hashing           |
| `ECHO_RATE_LIMIT_PER_MINUTE`    | No         | `5`                               | Max POST requests per IP per minute  |
| `SPRING_PROFILES_ACTIVE`        | No         | `default`                         | Active Spring profile (dev/prod)     |

## API Endpoints

- `GET /api/v1/notes` - List notes (paginated)
- `POST /api/v1/notes` - Create a note
- `GET /api/v1/notes/{id}` - Get a single note
- `GET /actuator/health` - Health check
- `GET /actuator/prometheus` - Prometheus metrics

## Code Formatting

```bash
# Check formatting
./mvnw spotless:check

# Apply formatting
./mvnw spotless:apply
```
