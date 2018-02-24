var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var PORT = 3000;

var maxTables = 5;

var reservations = [{
        name: "Yoda",
        phone: "1234",
        email: "test.com",
        type: "reserved",
        id: "1"
    },
    {
        name: "Yoda1",
        phone: "1234",
        email: "test.com",
        type: "wailist",
        id: "2"
    }
];

//HTML routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/html/home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/html/reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/html/tables.html"));
});

//API routes
app.get("/api/reservation", function(req, res) {
    res.json(reservations);
});

app.get("/api/reservation/:id?", function(req, res) {
    var id = req.params.id;
    var user;
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].id === id) {
            user = reservations[i];
        }
    }
    res.json(user);
});

app.post("/api/newReservation", function(req, res) {
    var newReservationReq = req.body;
    console.log(newReservationReq.email);
    var currentReservation = 0;
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].type === "reserved") {
            currentReservation++;
        }
    }

    if (currentReservation < maxTables) {
        newReservationReq.type = "reserved";
    } else {
        newReservationReq.type = "waitlist";
    }

    reservations.push(newReservationReq);

    res.json(newReservationReq);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});