# Chatbot

A streaming chatbot API for Bukeka Nxumalo, powered by Google Gemini, built with Node.js, Express, and MongoDB.

## Features

- Streams responses from Gemini 2.5 Flash model
- Custom persona and instructions loaded from MongoDB
- Google Search tool integration
- Stores chat history in MongoDB
- API-first design for easy integration
- Rate limiting, security headers, and CORS support

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB database

### Installation

```bash
git clone https://github.com/devzwide/chatbot.git
cd chatbot
npm install
```

### Configuration

Create a `.env` file in the root directory:

```shell
PORT=8000
GEMINI_API_KEY=your_google_gemini_api_key
MONGODB_CONN_STR=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
```

#### System Instruction

Add a document to your MongoDB `chatbotDB` database in the `config` collection:

```json
{
  "key": "system_instruction",
  "system_instruction": "Your custom persona instructions..."
}
```

### Running the Server

```bash
npm run dev
```

Server will start on the port specified in `.env`.

### Docker

To run with Docker:

```bash
docker build -t chatbot .
docker run -p 8000:8000 --env-file .env chatbot
```

## API Usage

### Health Check

`GET /api/health`

Returns `{ "status": "ok" }` if the server is running.

### Chat Endpoint

`POST /api/chat`

#### Request Body

```json
{
  "message": "Your question or prompt here"
}
```

#### Response

- Streams plain text response from Gemini model.

## Project Structure

- [`server.js`](server.js) – Express server setup
- [`routes/router.js`](routes/router.js) – API routing
- [`controllers/gemini.controller.js`](controllers/gemini.controller.js) – Gemini API integration and streaming logic
- [`controllers/status.controller.js`](controllers/status.controller.js) – Health check endpoint
- [`controllers/error.controller.js`](controllers/error.controller.js) – Error handling
- [`config/db.config.js`](config/db.config.js) – MongoDB connection

## License

MIT © 2025 Bukeka Nxumalo

---

For more details, see [`package.json`](package.json).
