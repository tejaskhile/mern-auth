// Handle 404 Not Found errors
const notFound = (req, res, next) =>{
    // Create new error with custom message including the attempted URL
    const err = new Error(`Not found - ${req.originalUrl}`)
    res.status(404);  // Set status code to 404
    next(err);  // Pass error to next middleware
}

// Global error handling middleware
const errorHandler = (req, res, next) =>{
    // Determine appropriate status code
    let statusCode = res.statuCode === 200 ? 500 : res.statuCode;
    let message = err.message;

    // Special handling for MongoDB CastError (invalid ObjectId)
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = 'Resource not found';
    }

    // Send error response
    res.status(statusCode).json({
        message,
        // Include stack trace only in development environment
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {errorHandler, notFound}