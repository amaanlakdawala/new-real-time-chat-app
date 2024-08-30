import express from "express"
import { getAllUsers, login, logout, register, updateProfile, getUserProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import upload from "../middleware/multer.js"
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/getAllUsers').get(isAuthenticated,getAllUsers)
router.route('/getUserProfile').get(isAuthenticated,getUserProfile)
router.route('/updateProfile').post(isAuthenticated,upload.single('profilePic'),updateProfile)

export default router;