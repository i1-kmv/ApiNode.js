"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.use(function (req, res, next) {
    console.log("userRouter Time:", Date.now());
    next();
});
userRouter.post("/login", function (req, res) {
    res.send("login");
});
userRouter.post("/register", function (req, res) {
    res.send("register");
});
