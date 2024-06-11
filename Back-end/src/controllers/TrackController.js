const TrackService = require('../services/TrackService')
const RecommendService = require('../services/RecommendService')

const createTrack = async (req, res) => {
    try {
        const { title, artistIds, link, image, genreIds, releaseDate, duration } = req.body;

        if (!title || !artistIds || !link || !image || !genreIds || !releaseDate || !duration) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

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
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
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
    getDetailsTrack,
    recommendTracks,
}