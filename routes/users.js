const express = require("express");
const router = express.Router();

const UsersController = require('../controllers/users')

router.get('/new', UsersController.New)
router.post('/', UsersController.Create)
router.get('/profile', UsersController.Profile)
router.post('/name', UsersController.Name)
router.post('/email', UsersController.Email)

module.exports = router;