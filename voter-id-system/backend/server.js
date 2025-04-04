import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import voterRoutes from './routes/voterRoutes.js';
import { errorHandler, notFoundHandler } from './utils/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT']
}));
app.use(morgan('dev'));
app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.use('/api/voter', voterRoutes);

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const clientBuildPath = path.join(__dirname, '../client/build');
  app.use(express.static(clientBuildPath));

  // Serve the index.html for any route not matching API
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, 'index.html'));
  });
}

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Try to find an available port starting from the preferred one
const startServer = async (port = process.env.PORT || 3001) => {
  try {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${parseInt(port) + 1}`);
      startServer(parseInt(port) + 1);
    } else {
      console.error('Server error:', err);
    }
  }
};

startServer();