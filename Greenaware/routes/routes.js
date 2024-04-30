const express = require('express');
const router = express.Router();
const passport = require('passport');
const Greenaware = require('../models/user');
const bcrypt = require('bcrypt');

// Route to render the index page
router.get("/", (req, res) => {
    res.render("index");
});

checkAuth = (req, res, next) => { // passport adds this to the request object 
    if (req.isAuthenticated()) { return next(); }

res.redirect("/login");

};

router.get("/login", (req, res) => {
    console.log(`Authenticated at /login: ${req.isAuthenticated()}`);
    res.render("login"); // Render the login page
});

// POST login form submission
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get("/register", (req, res) => {
    console.log(`Authenticated at /register: ${req.isAuthenticated()}`);
    res.render("register"); // Render the register page
});

router.post("/register", (req, res) => {
    // Hash the password using bcrypt
    bcrypt.hash(req.body.password, 10, function(err, hashedPassword) {
        if (err) {
            console.error("Error hashing password:", err);
            return res.render("register", { error: "Error hashing password" });
        }
        
        // Create a new user with the hashed password
        Greenaware.register(
            new Greenaware({ username: req.body.username,forename: req.body.forename,surname: req.body.surname,category: req.body.category, adress: req.body.adress, password: hashedPassword }), 
            req.body.password, 
            function(err, user) {
                if (err) {
                    console.error("Error registering user:", err);
                    return res.render("register", { error: err });
                } else {
                    passport.authenticate("local")(req, res, function() {
                        console.log(`Authenticated: ${req.isAuthenticated()}`);
                        res.redirect("/dashboard");
                    });
                }
            }
        );
    });
})

// Route to render the dashboard page
router.get("/dashboard", checkAuth, (req, res) => {
    // Check the user's category
    if (req.user.category === "observer") {
        // If the user is an observer, render the observer dashboard
        res.render("dashboard/observer", { user: req.user });
    } else if (req.user.category === "support") {
        // If the user is support, render the support dashboard
        res.render("dashboard/support", { user: req.user });
    } else {
        // Handle other categories or edge cases
        res.redirect("/login");
    }
});

// Route for support to manage observer accounts
router.get("/dashboard/support/manage-accounts", checkAuth, (req, res) => {
    if (req.user.category === "support") {
        // Render the support dashboard for managing accounts
        res.render("dashboard/support/manage-accounts", { user: req.user });
    } else {
        // Redirect to login if not a support user
        res.redirect("/login");
    }
});

// Route to disable observer accounts
router.post("/dashboard/support/disable-account/:id", checkAuth, (req, res) => {
    if (req.user.category === "support") {
        const observerId = req.params.id;
        // Logic to disable observer account with ID observerId
        Greenaware.findByIdAndUpdate(observerId, { accountStatus: "inactive" }, (err, updatedObserver) => {
            if (err) {
                console.error("Error disabling observer account:", err);
                // Handle error
            } else {
                // Account disabled successfully
                res.redirect("/dashboard/support/manage-accounts");
            }
        });
    } else {
        // Redirect to login if not a support user
        res.redirect("/login");
    }
});

// Route to create new support accounts
router.post("/dashboard/support/create-account", checkAuth, (req, res) => {
    if (req.user.category === "support") {
        // Retrieve data from request body
        const { username, forename, surname, address, category } = req.body;

        // Create a new support account
        Greenaware.register(new Greenaware({
            username: username,
            forename: forename,
            surname: surname,
            address: address,
            category: category
        }), req.body.password, (err, newSupport) => {
            if (err) {
                console.error("Error creating support account:", err);
                // Handle error
            } else {
                // Support account created successfully
                res.redirect("/dashboard/support/manage-accounts");
            }
        });
    } else {
        // Redirect to login if not a support user
        res.redirect("/login");
    }
});

module.exports = router;
