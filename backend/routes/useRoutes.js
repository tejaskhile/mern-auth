import express from "express";  // Import Express framework
const router = express.Router();  // Create new router instance

// Import controller functions for user operations
import { 
    authUser,      // Handles user authentication
    registerUser,  // Handles user registration
    logoutUser,    // Handles user logout
    getUserProfile,// Gets user profile data
    updateUser     // Updates user information
} from "../controllers/userControllers.js";

// Import authentication middleware
import { protect } from "../middleware/authMiddleware.js";

// Define routes and their corresponding controllers
router.post('/', registerUser)  // POST /api/users - Register new user
router.post('/auth', authUser)  // POST /api/users/auth - Authenticate user
router.post('/logout', logoutUser)  // POST /api/users/logout - Logout user

// Combined route for profile operations
router.route('/profile')
    .get(protect, getUserProfile)  // GET /api/users/profile - Get user profile (protected)
    .put(protect, updateUser)      // PUT /api/users/profile - Update user profile (protected)

export default router;