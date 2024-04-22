const express = require("express")
const router = express.Router()
const UserController = require('../controllers/UserController')
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/sign-up', UserController.createUser)
router.post('/sign-in', UserController.loginUser)
router.post('/log-out', UserController.logoutUser)
router.put('/update-user/:id', UserController.updateUser)
router.delete('/delete-user/:id', authMiddleWare, UserController.deleteUser)
router.get('/get-all-user', UserController.getAllUser)


module.exports = router