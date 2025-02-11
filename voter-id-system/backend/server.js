import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import voterRoutes from './routes/voterRoutes.js';
import { errorHandler, notFoundHandler } from './utils/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT']
}));
app.use(morgan('dev'));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/voter', voterRoutes);
//cors
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET'],
  credentials: true
};
// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`));