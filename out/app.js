"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./util/database"));
const user_1 = __importDefault(require("./models/user"));
const messages_1 = __importDefault(require("./models/messages"));
const user_2 = __importDefault(require("./routes/user"));
const message_1 = __importDefault(require("./routes/message"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5500",
    methods: ["PUT", 'POST', 'DELETE', 'GET']
}));
app.use(body_parser_1.default.json());
user_1.default.hasMany(messages_1.default);
messages_1.default.belongsTo(user_1.default);
app.use('/user', user_2.default);
app.use('/message', message_1.default);
database_1.default
    // .sync({force: true})
    .sync()
    .then(() => app.listen(3000))
    .catch((err) => console.log("sequelize>>>", err));
