import express from 'express'; // ESM modules 
import router from './router';
import 'dotenv/config'; // import dotenv and configure it to use the .env file
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
import cors from 'cors';

const app = express();

// read JSON data from the request body
app.use(express.json());

// connect to the database
connectDB();

// cors
app.use(cors(corsConfig))

// routing
app.use('/', router);

export default app;