const PlaylistService = require('../services/PlaylistService')
const JwtService = require("../services/JwtService")

const createPlaylist = async (req,res)=> {
    try {
        const decodedToken = await JwtService.decodeAccessToken(req.headers.token)
        const creator = decodedToken.id
        const {title, description, trackIds } = req.body
        if (!title || !trackIds)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }

        
        const response = await PlaylistService.createPlaylist(req.body, creator)
        return res.status(200).json(response)
    }

    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updatePlaylist = async (req,res)=> {
    try {
        const decodedToken = await JwtService.decodeAccessToken(req.headers.token)
        const updater = decodedToken.id
        const playlistId = req.params.id
        const data = req.body
        const response = await PlaylistService.updatePlaylist(data, playlistId, updater)
        return res.status(200).json(response)
    }

    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deletePlaylist = async (req,res) => {
    console.log('debug')
    try {
        const user = await JwtService.decodeAccessToken(req.headers.token)
        const playlistId = req.params.id
        const response = await PlaylistService.deletePlaylist(playlistId, user)
        return res.status(200).json(response)
    }

    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsPlaylist = async (req, res) => {
    try {
        console.log('debug')
        const playlistId = req.params.id
        if (!playlistId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The playlistId is required'
            })
        }
        const response = await PlaylistService.getDetailsPlaylist(playlistId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllPlaylist = async (req, res) => {
    try {
      const { limit, page, sort, filter } = req.query;
      const response = await PlaylistService.getAllPlaylist(
        Number(limit) || null,
        Number(page) || 0,
        sort,
        filter
      );
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

module.exports = {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getDetailsPlaylist,
    getAllPlaylist
}