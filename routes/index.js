import express from 'express'
const router = express.Router()
import home from './modules/home.js'
import record from './modules/record.js'
import users from './modules/users.js'
import { authenticator } from '../middleware/auth.js'



router.use('/users', users)
router.use("/", authenticator, record);
router.use("/", authenticator, home);

export default router