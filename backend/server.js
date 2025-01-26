// Import required dependencies
import express from "express";  // Express framework for building the API
import dotenv from "dotenv"    // For managing environment variables
import cookieParser from "cookie-parser";  // Middleware to handle cookies
import connectDb from "./config/db.js";    // Database connection function
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";  // Custom error handling middleware
import userRoutes from './routes/useRoutes.js'  // User-related routes
import path from 'path'

// Load environment variables from .env file
dotenv.config()

// Define port number from environment variables or use 5000 as default
const port = process.env.PORT || 5000;

// Initialize database connection
connectDb();

// Create Express application instance
const app = express();

// Middleware setup
app.use(express.json());  // Parse JSON bodies in requests
app.use(express.urlencoded({extended: true}));  // Parse URL-encoded bodies
app.use(cookieParser());  // Parse cookies in requests

// Mount user routes at /api/users path
app.use('/api/users', userRoutes)

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get('*', ()=>{res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))});
}else{
    app.get('/', (req, res)=>{
        res.send("Server is ready!");  // Send basic response for root path
    });
}


// Error handling middleware
app.use(notFound)      // Handle 404 errors
app.use(errorHandler)  // Handle all other errors



// Start server and listen on specified port
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})