const GenreService = require ('../services/GenreService')

const createGenre = async (req,res) => {
    try {
        const {name} = req.body

        if (!name)
        {
            return res.status(200).json({
                message: "The name is required"
            })
        }

        const response = await GenreService.createGenre(req.body)
        return res.status(200).json(response)
    }

    catch (e)
    {
        return res.status(404).json({
            message: e
        })
    }
}

const updateGenre = async (req,res) => {
    try {
        const genreId = req.params.id
        const data = req.body;
        if (!genreId)
        {
            return res.status(200).json({
                message: "The genre is undefined"
            })
        }

        const response = await GenreService.updateGenre(genreId, data)
        return res.status(200).json(response)
    }

    catch (e)
    {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteGenre = async (req,res) => {
    try {
        const genreId = req.params.id

        if (!genreId)
        {
            return res.status(200).json({
                message: "The genre is undefined"
            })
        }

        const response = await GenreService.deleteGenre(genreId)
        return res.status(200).json(response)
    }

    catch (e)
    {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteManyGenre = async (req, res) => {
    try {
        const {ids} = req.body
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await GenreService.deleteManyGenre(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllGenre = async (req,res) => {
    try {
        const response = await GenreService.getAllGenre()
        return res.status(200).json(response)
    }
    catch (e)
    {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsGenre = async (req, res) => {
    try {
        const id = req.params.id
        const response = await GenreService.getDetailsGenre(id)
        return res.status(200).json(response)
    }
    catch (e)
    {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createGenre,
    updateGenre,
    deleteGenre,
    deleteManyGenre,
    getAllGenre,
    getDetailsGenre
}