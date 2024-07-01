import express, { Express } from "express";
import { Server } from "http";
import recipeRouter from "./routes/recipeRoutes";
import { errorConverter, errorHandler } from "./middleware";
import { connectMysqlDB } from "./database";
import config from "./config/config";
//import { cors } from "cors";
//import { rabbitMQService } from "./services/RabbitMQService";
const cors = require('cors');
const servciePort = "3000";

const app: Express = express();
app.use(cors({
    origin: 'http://localhost:'+ servciePort
  }));
let server: Server;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(recipeRouter);
app.use(errorConverter);
app.use(errorHandler);

connectMysqlDB();

server = app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});
/*
const initializeRabbitMQClient = async () => {
    try {
        await rabbitMQService.init();
        console.log("RabbitMQ client initialized and listening for messages.");
    } catch (err) {
        console.error("Failed to initialize RabbitMQ client:", err);
    }
};
*/

//initializeRabbitMQClient();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);