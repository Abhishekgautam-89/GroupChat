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
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => {
    const body = req.body;
    // console.log(body);
    const salt = 15;
    try {
        bcrypt_1.default.hash(body.password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            const [newUser, created] = yield user_1.default.findOrCreate({
                where: {
                    Email: body.email,
                    Phone: body.phone
                },
                defaults: {
                    Name: body.name,
                    Password: hash
                }
            });
            if (created) {
                res.status(201).json({ userStatus: true, message: "New-User Created" });
            }
            else {
                res.status(201).json({ userStatus: true, message: "Email-Id or Phone Number already exists" });
            }
        }));
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ userStatus: false });
    }
};
exports.default = { registerUser };
