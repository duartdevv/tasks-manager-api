
# Rest API

A simple Node.js REST API for managing tasks using Express and MySQL.

## Overview

This is a lightweight REST API built with Node.js and Express, designed for efficient task management operations. It integrates with MySQL to provide persistent data storage and includes comprehensive error handling and middleware support for production-ready applications.

## Project Structure

The API is organized with the following components:

- **api.js** - Main application file containing all route handlers and middleware
- **inc/mysql_config.js** - Database configuration file
- **inc/functions.js** - Utility functions for standardized API responses

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Dependencies:** mysql2, cors, express

This project provides a basic REST API server running on port 3000 with endpoints to retrieve tasks from a MySQL database.

## Features

- CORS enabled for cross-origin requests
- JSON request body parsing
- Input validation for task operations
- POST endpoint for task creation
- PUT endpoint for task status updates
- DELETE endpoint for task removal
- Error handling with appropriate HTTP status codes
- Task management endpoints
- Standardized JSON response format
- API availability check middleware

## API Endpoints

### GET `/`
Returns a simple status message indicating the API is running.

### GET `/tasks`
Retrieves all tasks from the database.

**Response:**
```json
{
    "status": "success",
    "message": "success",
    "affected_rows": 5,
    "data": [...],
    "timeStamp": 1234567890
}
```

### GET `/tasks/:id`
Retrieves a specific task by ID.

**Response:**
- `200` - Task found
- `404` - Task not found
- `500` - Server error

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure database in `inc/mysql_config.js`

3. Start the server:
```bash
node api.js
```

## Requirements

- Node.js
- MySQL
- Express
- mysql2
- cors
