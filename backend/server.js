"use strict";
exports.__esModule = true;
require("es6-shim");
require("reflect-metadata");
var path = require("path");
var bodyParser = require("body-parser");
var moment = require("moment");
var express = require('express');
// Allowed extensions list can be extended depending on your own needs
var allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        this.port = 9090;
        this.db = {};
        // Added default values
        this.db.contacts = [
            { firstName: 'John',
                lastName: 'Doe',
                phoneNumber: 1234567
            },
            { firstName: 'Jane',
                lastName: 'Doe',
                phoneNumber: 9876543
            }
        ];
        // Create expressjs application
        this.app = express();
        // Depending on your own needs, this can be extended
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.raw({ limit: '50mb' }));
        this.app.use(bodyParser.text({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));
        // Route our backend calls
        this.app.get('/api', function (req, res) { return res.json({ application: 'Phonebook API' }); });
        // Get contacts
        this.app.get('/api/contacts', function (req, res) { return res.json({ contacts: _this.db.contacts }); });
        // Add contacts
        this.app.post('/api/contact', function (req, res) {
            console.log("POST: ", req.body);
            _this.db.contacts.push(req.body);
            return res.json({ contacts: _this.db.contacts });
        });
        // Redirect all the other resquests
        this.app.get('*', function (req, res) {
            if (allowedExt.filter(function (ext) { return req.url.indexOf(ext) > 0; }).length > 0) {
                res.sendFile(path.resolve("dist/phonebook" + req.url));
            }
            else {
                res.sendFile(path.resolve('dist/phonebook/index.html'));
            }
        });
        // Start the server on the provided port
        this.app.listen(this.port, function () { return console.log("http is started " + _this.port); });
        // Catch errors
        this.app.on('error', function (error) {
            console.error(moment().format(), 'ERROR', error);
        });
        process.on('uncaughtException', function (error) {
            console.log(moment().format(), error);
        });
    }
    Server.bootstrap = function () {
        return new Server();
    };
    return Server;
}());
//Bootstrap the server, so it is actualy started
var server = Server.bootstrap();
exports["default"] = server.app;
