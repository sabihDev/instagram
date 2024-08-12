import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const PORT = process.env.PORT || 6000;


const app = express();
// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: "*",
    credentials: true
};
app.use(cors(corsOptions));


// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/message", messageRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})