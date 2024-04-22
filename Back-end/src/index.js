const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require('./routes')

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json())

routes(app);

app.get('/', (req,res) => {
    res.send('Hello World')
})

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect Db success!" + `${process.env.MONGO_DB}`);
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log("Server is running in port: ", +port);
});
