const userRoutes = require('express').Router()
const {
  getAccessToken,
  getUserData
} = require('../controllers/user.controllers')

userRoutes
  .get('/get-access-token', getAccessToken)
  .get('/get-user-data', getUserData)

module.exports = userRoutes