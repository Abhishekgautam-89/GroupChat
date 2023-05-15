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
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // console.log(body);
    const saltRounds = 10;
    try {
        // bcrypt.hash(body.password, salt, async (err, hash) => {
        //     hashPassword = hash;
        // })
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hash = yield bcrypt_1.default.hash(body.password, salt);
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
            // res.status(201).json({ userStatus: true, message: "Email-Id or Phone Number already exists" });
            throw ("Email-Id or Phone Number already exists");
        }
    }
    catch (err) {
        // console.log(err);
        res.status(401).json({ userStatus: false, message: err });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    try {
        const loginUser = yield user_1.default.findAll({
            where: {
                Email: body.email
            }
        });
        const test = yield bcrypt_1.default.compare(body.password, loginUser[0].dataValues.Password);
        if (test) {
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = { registerUser, login };
