import { Sequelize } from "sequelize-typescript";
import dontenv from "dotenv";
dontenv.config();

const db = new Sequelize(process.env.DBCONNECTION, {
  models: [__dirname + "/../models/**/*"],
  logging: false,
});

export default db;
