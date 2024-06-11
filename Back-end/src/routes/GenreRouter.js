const express = require("express")
const router = express.Router()
const GenreController = require('../controllers/GenreController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', authMiddleWare, GenreController.createGenre)
router.post('/update/:id', authMiddleWare, GenreController.updateGenre)
router.delete('/delete/:id', authMiddleWare, GenreController.deleteGenre)
router.get('/get-all', GenreController.getAllGenre)


module.exports = router