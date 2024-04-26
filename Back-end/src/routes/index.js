const UserRouter = require("./UserRouter")
const ArtistRouter = require("./ArtistRouter")

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/artist', ArtistRouter)
}

module.exports = routes