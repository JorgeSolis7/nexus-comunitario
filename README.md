# Nexus Comunitario

Sitio de portafolio para un laboratorio de innovación cívica ficticio. SPA en Vite + TypeScript sin framework ni librerías de animación.

## Estructura

```
backend/                       .NET 10 Web API
  NexusComunitario.sln
  src/
    NexusComunitario.Api/            Punto de entrada HTTP (controllers, wwwroot)
      wwwroot/uploads/               Archivos subidos en tiempo de ejecución
    NexusComunitario.Application/    Casos de uso, DTOs, interfaces
    NexusComunitario.Domain/         Entidades de dominio
    NexusComunitario.Infrastructure/ Persistencia y servicios externos
frontend/                      TypeScript + Vite
  public/                      favicon.svg
  src/                         Código TypeScript
docker-compose.yml
```

## Desarrollo local

```bash
# Backend (http://localhost:5080)
cd backend && dotnet run --project src/NexusComunitario.Api

# Frontend (http://localhost:5180, /api se redirige al backend)
cd frontend && npm install && npm run dev
```

## Docker

```bash
cp .env.example .env
docker compose up --build
# http://localhost:8080
```
