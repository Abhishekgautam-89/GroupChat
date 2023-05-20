"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controller/user"));
const router = (0, express_1.Router)();
router.post('/new', user_1.default.registerUser);
router.post('/login', user_1.default.login);
exports.default = router;
