const express = require("express")
const router = express.Router()
const GenreController = require('../controllers/GenreController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', authMiddleWare, GenreController.createGenre)
router.post('/update/:id', authMiddleWare, GenreController.updateGenre)
router.delete('/delete/:id', authMiddleWare, GenreController.deleteGenre)
router.post('/delete-many', authMiddleWare, GenreController.deleteManyGenre)
router.get('/get-all', GenreController.getAllGenre)
router.get('/get-details/:id', GenreController.getDetailsGenre)


module.exports = router