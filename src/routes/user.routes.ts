import { Router } from 'express'
import { getBackendStatus, getAccessToken, getUserDetails, getUserRepos } from '../controllers/user.controllers.js';

const userRoutes = Router();

userRoutes
  .get('/get-backend-status', getBackendStatus)
  .get('/get-access-token', getAccessToken)
  .get('/get-user-details', getUserDetails)
  .post('/post-user-repos', getUserRepos)

export default userRoutes