"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const config_1 = require("../database/config");
const products_1 = require("../routes/products");
const bodyParser = require("body-parser");
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        // Connect to database
        this.connectDB();
        // Middlewares
        this.middlewares();
        // Routes
        this.app.use("/api/products", products_1.router);
    }
    async connectDB() {
        await (0, config_1.dbConnection)();
    }
    middlewares() {
        // CORS
        const corsOptions = {
            origin: 'https://ecommerce-frontend-two-tau.vercel.app/',
            optionsSuccessStatus: 200,
        };
        this.app.use(cors(corsOptions));
        // Body parsing
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Urbaneer backend listening on port ${this.port}`);
        });
    }
}
exports.Server = Server;
