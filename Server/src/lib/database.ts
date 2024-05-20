import { Sequelize } from "sequelize";
import mysql from "mysql";

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME!,
  //@ts-ignore
  port: process.env.DB_PORT,
  multipleStatements: true,
});
export const connectToDB = async () => {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
  });

  // try {
  //   await sequelize.authenticate();
  //   console.log("Connection has been established successfully.");
  // } catch (error) {
  //   console.error("Unable to connect to the database:", error);
  // }
};
