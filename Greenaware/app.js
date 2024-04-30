const express = require("express");
const app = express();
const port = 3001;
const session = require("express-session");
const passport = require("passport"); 
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const routes = require("./routes/routes");

// Static assets
app.use(express.static("public"));

// Enables transfer of post data from HTML forms
app.use(express.urlencoded({ extended: true }));

// Views engine middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// MongoDB ORM middleware
const mongoose = require("./config/dbconfig");

// Express session middleware
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount routes
app.use("/", routes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
