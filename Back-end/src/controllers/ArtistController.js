const ArtistService = require('../services/ArtistService')

const createArtist = async (req,res) => {
    try {

        const {name, image, country, description} = req.body
        if (!name || !image || !country || !description)
        {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ArtistService.createArtist(req.body)
        return res.status(200).json(response)
    }

    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateArtist =  async (req, res) => {    
    try {
        const artistId = req.params.id
        if (!artistId)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The artist is required'
            })
        }

        const data = req.body
        const response = await ArtistService.updateArtist(artistId, data)
        return res.status(200).json(response)
    }

    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteArtist = async (req,res) => {
    try {
        const artistId = req.params.id
        if (!artistId)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The artist is required'
            })
        }

        const response = await ArtistService.deleteArtist(artistId)
        return res.status(200).json(response)
    }

    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteManyArtist = async (req,res) => {
    try {

        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ArtistService.deleteManyArtist(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsArtist = async (req, res) => {
    try {
        const artistId = req.params.id
        if (!artistId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The artistId is required'
            })
        }

        const response = await ArtistService.getDetailsArtist(artistId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllArtist = async (req, res) => {
    try {
      const { limit, page, sort, filter } = req.query;
      const response = await ArtistService.getAllArtist(
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
    createArtist,
    updateArtist,
    deleteArtist,
    deleteManyArtist,
    getDetailsArtist,
    getAllArtist
}