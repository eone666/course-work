const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const ejs = require("ejs");
const ip = require("ip");
const clc = require("cli-color");
const formidable = require("formidable");

const app = express();

const PORT = config.get("port") || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    type: "multipart/form-data"
  })
);

app.use("/static", express.static(__dirname + "/public"));

app.use("/libs", express.static(__dirname + "/node_modules"));

app.set("view engine", "ejs");

app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/monument", require("./routes/monument.routes"));

(async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
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
    clc.bgWhite.black(
      `http://localhost:${PORT}\nhttp://${ip.address()}:${PORT}`
    )
  )
);
