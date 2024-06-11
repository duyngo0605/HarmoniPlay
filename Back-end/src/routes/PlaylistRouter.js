const express = require("express")
const router = express.Router()
const PlaylistController = require("../controllers/PlaylistController")
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', PlaylistController.createPlaylist)
router.post('/update/:id', PlaylistController.updatePlaylist)
router.delete('/delete/:id', PlaylistController.deletePlaylist)
router.get('/get-details/:id', PlaylistController.getDetailsPlaylist)
router.get('/get-all', PlaylistController.getAllPlaylist)




module.exports = router