var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var reservations = [
    // {
    //     routeName: "kristianfidrych",
    //     name: "Kristian Fidrych",
    //     phone: "2158176605",
    //     email: "kristianfidrych@gmail.com",
    //     uniqueID: 4567
    // }
];

var waitlist = [
    // {
    //     routeName: "bob",
    //     name: "Bob Fidrych",
    //     phone: "2155555555",
    //     email: "bobfidrych@gmail.com",
    //     uniqueID: 8900
    // }
];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

app.get("/api/reservations/:reservation", function(req, res) {
    var chosen = req.params.reservation;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].routeName) {
            return res.json(reservations[i]);
        }
    }
    return res.json(false);
});

app.post("/api/reservations", function(req, res) {
    var newReservation = req.body;

    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);
    reservations.push(newReservation);
    res.json(newReservation);
});

app.post("/api/waitlist", function(req, res) {
    var addWaitlist = req.body;

    addWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();

    console.log(addWaitlist);
    waitlist.push(addWaitlist);
    res.json(addWaitlist);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});