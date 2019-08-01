
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require("path");
const pino = require('express-pino-logger')();

const ENV = process.env.NODE_ENV || 'dev';

var routes = require("./routes");
var proxyResolver = require("./Proxy/resolver");

const PORT = process.env.PORT || 7001;

var morganFn = morgan(function (tokens, req, res) {
    return [
        req.cookies.email,
        req.cookies.username,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')

});

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Health Check
app.get("/health-check", (req, res) => res.send("Health check verified"))

// Proxy setup to select proper host
app.use('/proxy', proxyResolver);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(pino);

// Logger
app.use(morganFn);

// Static files
app.use(express.static(path.join(__dirname, "..", "..", "build")));

// Client app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Carousel Application Server is listening at http://%s:%s', host, port);
});