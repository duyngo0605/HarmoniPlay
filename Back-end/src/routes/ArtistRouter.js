const express = require("express")
const router = express.Router()
const ArtistController = require('../controllers/ArtistController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', authMiddleWare, ArtistController.createArtist)
router.post('/update/:id', authMiddleWare, ArtistController.updateArtist)
router.post('/update-follower/:id', ArtistController.updateArtist)
router.delete('/delete/:id', authMiddleWare, ArtistController.deleteArtist)
router.post('/delete-many', authMiddleWare, ArtistController.deleteManyArtist)
router.get('/get-details/:id', ArtistController.getDetailsArtist)
router.get('/get-all', ArtistController.getAllArtist)


module.exports = router