require("dotenv").config();
//#region express configures
var express = require("express");
var path = require("path");
var logger = require("morgan");
const session = require("client-sessions");
const cors = require("cors");
const DButils = require("./routes/utils/DButils");

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: "secret", // the encryption key
    duration: 600 * 60 * 1000, // expired after 600 minutes
    activeDuration: 0, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie: {
      httpOnly: false,
    },
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

const user = require("./routes/user");
const recipes = require("./routes/recipes");
const auth = require("./routes/auth");  

//app.get("/", (req, res) => res.send("welcome"));

app.use("/user", user);
app.use("/recipes", recipes);
app.use(auth)

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({ message: err.message, success: false });
});

var port = process.env.PORT || "3000";
const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
