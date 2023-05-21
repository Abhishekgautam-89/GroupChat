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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const registerUser = (req, res) => {
    const body = req.body;
    // console.log(body);
    const salt = 15;
    try {
        bcrypt_1.default.hash(body.password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            const [newUser, created] = yield user_1.default.findOrCreate({
                where: {
                    Email: body.email,
                    // Phone: body.phone
                },
                defaults: {
                    Name: body.name,
                    Password: hash,
                    Phone: body.phone
                }
            });
            if (created) {
                res.status(201).json({ userStatus: true, message: "New-User Created" });
            }
            else {
                res.status(201).json({ userStatus: false, message: "Email-Id or Phone Number already exists" });
                // throw ("Email-Id or Phone Number already exists");
            }
        }));
    }
    catch (err) {
        console.log("register>>", err);
        res.status(401).json({ userStatus: false, message: err });
    }
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // console.log(body)
    try {
        const loginUser = yield user_1.default.findAll({
            where: {
                Email: body.email
            }
        });
        if (loginUser.length > 0) {
            const test = yield bcrypt_1.default.compare(body.password, loginUser[0].dataValues.Password);
            if (test) {
                res.status(201).json({ Message: "Login Successful", token: jwtToken(loginUser[0].dataValues.Sr_no, loginUser[0].dataValues.Email, loginUser[0].dataValues.Name) });
            }
            else {
                // throw ('Entered Email-id or Password is incorrect!')
                res.status(401).json({ message: "User not authorized" });
            }
        }
        else {
            // throw ("User not found")
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUser = req.user;
    try {
        const allUsers = yield user_1.default.findAll({
            where: {
                Sr_no: { [sequelize_1.Op.ne]: [loginUser.Sr_no] }
            }
        });
        // user.sync({force:true})
        res.status(201).json({ data: allUsers });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ data: err });
    }
});
function jwtToken(id, email, name) {
    return jsonwebtoken_1.default.sign({ id, email, name }, process.env.SECRETkEY);
}
exports.default = { registerUser, login, getUser };
