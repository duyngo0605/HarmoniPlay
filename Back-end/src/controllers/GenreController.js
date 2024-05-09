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

        if (!genreId)
        {
            return res.status(200).json({
                message: "The genre is undefined"
            })
        }

        const response = await GenreService.updateGenre(genreId)
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

module.exports = {
    createGenre,
    updateGenre,
    deleteGenre,
    getAllGenre
}