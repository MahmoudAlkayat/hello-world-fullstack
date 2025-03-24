# Hello World Full-Stack Application

A full-stack application built with Spring Boot backend and Angular frontend.

## Project Structure

### Backend (hello-world-api)
- Spring Boot application with H2 database
- RESTful API endpoints for CRUD operations
- Entity fields: id, mood, level

### Frontend (hello-world-web)
- Angular application
- Components for displaying and managing entities
- Service layer for API integration

## Setup Instructions

### Backend
1. Navigate to `hello-world-api`
2. Run `./mvnw spring-boot:run`
3. Backend will start on http://localhost:8080

### Frontend
1. Navigate to `hello-world-web`
2. Run `npm install`
3. Run `ng serve`
4. Frontend will start on http://localhost:4200