"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import cors from 'cors'
//import bodyParser from 'body-parser'
const app = (0, express_1.default)();
const port = 4001;
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())
app.get('/', (req, res, next) => {
    res.json("Hello world");
});
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map