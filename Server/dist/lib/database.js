var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sequelize } from "sequelize";
import mysql from "mysql";
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});
export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    //@ts-ignore
    port: process.env.DB_PORT,
    multipleStatements: true,
});
export const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    connection.connect((err) => {
        if (err)
            throw err;
        console.log("Connected to the database!");
    });
    // try {
    //   await sequelize.authenticate();
    //   console.log("Connection has been established successfully.");
    // } catch (error) {
    //   console.error("Unable to connect to the database:", error);
    // }
});
