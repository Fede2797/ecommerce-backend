"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = require("mongoose");
const dbConnection = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_CNN);
        console.log("DB connected");
    }
    catch (error) {
        console.log(error);
        throw new Error("DB connection error");
    }
};
exports.dbConnection = dbConnection;
