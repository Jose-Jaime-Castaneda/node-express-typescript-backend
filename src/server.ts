import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import router from "./router";
import db from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    //console.log("Conexión a la DB completada");
  } catch (error) {
    console.log(error);
    console.log("Hubo un error al conectar con la base de datos");
  }
}
connectDB();

const server = express();

// permitir accesos
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {      
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan("dev"));
server.use("/api/productos", router);

//Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
