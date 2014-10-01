var express = require('express');
var bodyParser = require('body-parser');
var tessel = require('tessel');
var rfidlib = require('rfid-pn532');

var pubnub = require("pubnub").init({
  publish_key: "demo",
  subscribe_key: "demo",
  uuid: "your_name_here" + Math.floor(Math.random()*1000)
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var channel = "login-rfid";

app.set('views', './views')
app.set('view engine', 'jade')
app.engine('jade', require('jade').__express);


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {
    var valid_login = req.body.rfid_card === '1a1a674f' ||
        (req.body.username === 'edgar' && req.body.password === 'hello');
    if (valid_login) {
        res.redirect('/authorized');
    } else {
        res.redirect('/unauthorized');
    }
});

app.get('/authorized', function (req, res) {
    res.render('authorized');
});

app.get('/unauthorized', function (req, res) {
    res.render('unauthorized');
});

var server = app.listen(3000, function () {
    console.log("Listening on port %d", server.address().port);
});
