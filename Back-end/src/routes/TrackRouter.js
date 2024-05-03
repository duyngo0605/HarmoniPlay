const express = require("express")
const router = express.Router()
const TrackController = require('../controllers/TrackController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', authMiddleWare, TrackController.createTrack)
router.post('/update/:id', authMiddleWare, TrackController.updateTrack)
router.get('/get-details/:id', TrackController.getDetailsTrack)
router.delete('/delete/:id', authMiddleWare, TrackController.deleteTrack)


module.exports = router