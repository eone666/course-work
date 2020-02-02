const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const ejs = require("ejs");
const ip = require("ip");

const app = express();

const PORT = process.env.PORT || 3000;

const MONGO_URL = process.env.MONGO_URL;

mongoose.set('useFindAndModify', false);

app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    type: "multipart/form-data"
  })
);

app.use(express.static(__dirname + "/public"));

app.use("/libs", express.static(__dirname + "/node_modules"));

app.set("view engine", "ejs");

app.set("views", __dirname + "/views");

app.use("/", require("./routes/monument.routes"));

app.use('/regions',require('./routes/region.routes'));

app.use('/conditions',require('./routes/condition.routes'));

app.use((req, res) => {
  return res.render('404');
});

(async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (error) {
    console.log("SERVER ERROR:", error.message);
  }
})();

app.listen(
  PORT,
  console.log(
    `http://localhost:${PORT}\nhttp://${ip.address()}:${PORT}`
  )
);
