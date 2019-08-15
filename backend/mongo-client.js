"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var MongoClientApp = /** @class */ (function () {
    function MongoClientApp() {
        this.uri = "mongodb+srv://admin:admin@cluster0-8ps0r.mongodb.net/test?retryWrites=true&w=majority";
        this.client = new mongodb_1.MongoClient(this.uri, { useNewUrlParser: true });
        this.connect();
    }
    MongoClientApp.prototype.connect = function () {
        var _this = this;
        this.client.connect(function (error) {
            _this.collection = _this.client.db("contact").collection("contact");
            if (error)
                console.log("ERROR connecting:", error);
        });
    };
    MongoClientApp.prototype.disconnect = function () {
        this.client.close(function (error) {
            console.log("Error closing client", error);
        });
    };
    MongoClientApp.prototype.insert = function (data) {
        return this.collection.insertOne(data);
    };
    MongoClientApp.prototype.getAll = function () {
        return this.collection.find({}).toArray();
    };
    return MongoClientApp;
}());
exports["default"] = MongoClientApp;
