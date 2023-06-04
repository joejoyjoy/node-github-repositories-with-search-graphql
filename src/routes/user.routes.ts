import { Router } from 'express'
import { getAccessToken, getUserData } from '../controllers/user.controllers.js';

const userRoutes = Router();

userRoutes
  .get('/get-access-token', getAccessToken)
  .get('/get-user-data', getUserData)

export default userRoutes