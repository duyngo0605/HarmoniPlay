const TrackService = require('../services/TrackService')
const RecommendService = require('../services/RecommendService')

const createTrack = async (req, res) => {
    try {
        const { title, artist, link, image, genre, releaseDate, duration } = req.body;

        console.log(req.body)



        const response = await TrackService.createTrack(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
};

const updateTrack =  async (req,res) => {

    try {
        const trackId =  req.params.id
        if (!trackId)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The track is required'
            })
        }
        const data = req.body

        const response = await TrackService.updateTrack(trackId, data)
        return res.status(200).json(response)
    }
    catch (e)
    {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteTrack = async (req,res) => {
    try {
        const trackId = req.params.id
        if (!trackId)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await TrackService.deleteTrack(trackId)
        return res.status(200).json(response)
    }

    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteManyTrack = async (req,res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await TrackService.deleteManyTrack(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsTrack = async (req,res)=> {
    try {
        const trackId = req.params.id
        if (!trackId)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await TrackService.getDetailsTrack(trackId)
        return res.status(200).json(response)
    }

    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllTrack = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await TrackService.getAllTrack(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const recommendTracks = async (req,res) => {
    try {
        const trackId=req.params.id;
        const response = await RecommendService.recommendTracks(trackId);
        return res.status(200).json(response);
    }
    catch (e)
    {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createTrack,
    updateTrack,
    deleteTrack,
    deleteManyTrack,
    getDetailsTrack,
    recommendTracks,
    getAllTrack,
}