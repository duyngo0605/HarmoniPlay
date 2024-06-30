const express = require("express")
const router = express.Router()
const TrackController = require('../controllers/TrackController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.post('/create', authMiddleWare, TrackController.createTrack)
router.post('/update/:id', authMiddleWare, TrackController.updateTrack)
router.post('/update-plays-likes/:id', TrackController.updateTrack)
router.get('/get-details/:id', TrackController.getDetailsTrack)
router.get('/get-all', TrackController.getAllTrack)
router.delete('/delete/:id', authMiddleWare, TrackController.deleteTrack)
router.post('/delete-many', authMiddleWare, TrackController.deleteManyTrack)
router.post('/recommend/:id', TrackController.recommendTracks)


module.exports = router