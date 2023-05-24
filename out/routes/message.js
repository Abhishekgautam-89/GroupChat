"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = __importDefault(require("../controller/message"));
const tokenUthenticate_1 = __importDefault(require("../middleware/tokenUthenticate"));
const router = (0, express_1.Router)();
router.post('/new', tokenUthenticate_1.default.authenticate, message_1.default.addMessage);
router.get('/get', tokenUthenticate_1.default.authenticate, message_1.default.getMessage);
exports.default = router;
