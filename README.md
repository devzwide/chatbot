# Chatbot

A streaming chatbot API for Bukeka Nxumalo, powered by Google Gemini, built with Node.js and Express.

## Features

- Streams responses from Gemini 2.5 Flash model
- Uses custom persona and instructions from environment variables
- Supports Google Search tool integration
- API-first design for easy integration

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

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
SYSTEM_INSTRUCTION_TEXT=Your custom persona instructions...
```

### Running the Server

```bash
npm run dev
```

Server will start on the port specified in `.env`.

## API Usage

### Endpoint

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

- `server.js` – Express server setup
- `routes/router.js` – API routing
- `controllers/gemini.controller.js` – Gemini API integration and streaming logic

## License

MIT © 2025 Bukeka Nxumalo

---

For more details, see [package.json](package.json).
