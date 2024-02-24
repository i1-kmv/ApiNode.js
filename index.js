"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_js_1 = require("./users/users.js");
var port = 8000;
var app = (0, express_1.default)();
app.use(function (req, res, next) {
    console.log("Time:", Date.now());
    next();
});
app.get("/hello", function (req, res) {
    res.send({ success: true });
});
app.use("/users", users_js_1.userRouter);
app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(500).send(err.message);
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port, "/"));
});
