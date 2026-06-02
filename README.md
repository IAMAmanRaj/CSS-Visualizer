# CSS Visualizer

A modern CSS visualizer application to practice styling patterns including Flexbox, Grid, and custom layouts. Features a live code editor with real-time preview and the ability to save/load patterns.

## Features

- **Pattern Selector**: Switch between Flexbox, Grid, and Custom layout patterns
- **Monaco Editor**: Live CSS and HTML editing with syntax highlighting
- **Real-time Preview**: See changes instantly as you type
- **Save/Load**: Persist patterns in MongoDB
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React.js with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Monaco Editor for code editing

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- RESTful API architecture

## Project Structure

```
css-visualizer/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── api/           # API client functions
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── ...
└── backend/               # Express backend API
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── models/        # Mongoose models
    │   └── routes/        # Express routes
    └── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd css-visualizer
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Configure environment variables**
   
   Edit `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/css-visualizer
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

3. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Backend status message |
| GET | `/api/patterns` | Get all patterns |
| GET | `/api/patterns/type/:type` | Get patterns by type |
| GET | `/api/patterns/:id` | Get a single pattern |
| POST | `/api/patterns` | Create a new pattern |
| PUT | `/api/patterns/:id` | Update a pattern |
| DELETE | `/api/patterns/:id` | Delete a pattern |
| GET | `/api/health` | Health check endpoint |

## Production Notes

- A previous production bug returned `500` on `GET /api/patterns`.
- Root causes:
  - Vercel serverless route target was misconfigured.
  - MongoDB connection failures were not clearly surfaced in API responses.
- Fix applied:
  - Added a valid Vercel serverless entry (`backend/api/index.ts`) and updated backend routing config.
  - Improved MongoDB connection/error logging.
  - Improved controller error serialization so responses/logs show useful details.
- Current status: `GET https://css-visualizer-server.vercel.app/api/patterns` returns `200 OK`.

## Default Patterns

The app comes with pre-built templates for:

### Flexbox
- Basic Row Layout
- Column Layout
- Centered Content
- Wrap Layout

### Grid
- Basic 3x3 Grid
- Holy Grail Layout
- Auto-fit Cards
- Magazine Layout

### Custom
- Navigation Bar
- Card Component
- Hero Section

## Usage

1. **Select a Pattern Type**: Choose between Flexbox, Grid, or Custom using the tabs
2. **Choose a Template**: Click on a template to load it into the editor
3. **Edit Code**: Modify the CSS and HTML in the Monaco editor
4. **See Changes**: The preview updates in real-time as you type
5. **Save Patterns**: Click "Save" to persist your custom patterns to MongoDB
6. **Load Patterns**: Click "Load" to view and load your saved patterns

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```
The built files will be in `frontend/dist/`

### Backend
```bash
cd backend
npm run build
npm start
```

## Contributing

Contributions are welcome. Feel free to submit a pull request.

## License

This project is licensed under the MIT License.
