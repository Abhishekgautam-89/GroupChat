"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const messages_1 = __importDefault(require("../models/messages"));
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = req.user;
    try {
        const message = yield user.createMessage({
            Message: body.Message
        });
        res.status(201).json({ message: "Successfully Added", data: message });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: err });
    }
});
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const previousMessages = yield messages_1.default.findAll({
            include: {
                model: user_1.default,
                // as: Name,
                attributes: ['Name', 'Sr_no']
            }
        });
        // console.log(previousMessages);
        res.status(201).json({ message: previousMessages });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: err });
    }
});
exports.default = { addMessage, getMessage };
