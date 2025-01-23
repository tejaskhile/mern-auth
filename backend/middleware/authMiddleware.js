import jwt from 'jsonwebtoken';  // For JWT token handling
import asyncHandler from 'express-async-handler';  // For async error handling
import User from '../models/userModel.js';  // User model

// Middleware to protect routes that require authentication
const protect = asyncHandler(async (req, res, next)=>{
    let token;
    
    // Extract JWT token from cookies
    token = req.cookies.jwt;

    if(token){
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by ID and exclude password from result
            req.user = await User.findById(decoded.userId).select("-password");
            next();  // Proceed to next middleware/route handler

        } catch (error) {
            // Handle invalid token
            res.status(401);
            throw new Error("Not authorised, invalid token")
        }

    }else{
        // Handle missing token
        res.status(401);
        throw new Error("Not authorised, no token")
    }
})

export {protect}