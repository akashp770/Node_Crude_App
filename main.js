// Import

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;

// Database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the database."));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//images folder static
app.use(express.static("uploads"));
//Set template engine

app.set("view engine", "ejs");

//Route prefix
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`Server strated at http://localhost:${PORT}`);
});
