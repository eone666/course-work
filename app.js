const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const ejs = require("ejs");
const ip = require("ip");

const app = express();

const PORT = config.get("port") || 3000;

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
    `http://localhost:${PORT}\nhttp://${ip.address()}:${PORT}`
  )
);
