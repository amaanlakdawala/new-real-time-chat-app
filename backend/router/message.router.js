import express from "express"
import { getMessagedUser, getMessages, sendMessage } from "../controllers/message.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router()

router.route('/sendMessage/:id').post(isAuthenticated,sendMessage)
router.route('/getMessages/:id').get(isAuthenticated,getMessages)
router.route('/getMessagedUser/:id').get(isAuthenticated,getMessagedUser)

export default router;