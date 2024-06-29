const UserRouter = require("./UserRouter");
const ArtistRouter = require("./ArtistRouter");
const GenreRouter = require("./GenreRouter");
const TrackRouter = require("./TrackRouter");
const PlaylistRouter = require("./PlaylistRouter");
const UploadRouter = require("./UploadRouter")

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/artist", ArtistRouter);
  app.use("/api/genre", GenreRouter);
  app.use("/api/track", TrackRouter);
  app.use("/api/playlist", PlaylistRouter);
};

module.exports = routes;
