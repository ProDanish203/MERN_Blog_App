// Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import "express-async-errors";
import path from "path";
import { fileURLToPath } from 'url';
// Config Imports
import connDb from "../Config/db.js";
// Routes Imports
import authRoute from "../Routes/authRoute.js";
import blogRoute from "../Routes/blogRoute.js";
// Middleware Imports
import errorMiddleware from "../Middlewares/ErrorMiddlware.js";
// Security Imports
import helmet from "helmet";
import xss from "xss-clean";
import expMongoSanitize from "express-mongo-sanitize";


// .env config
dotenv.config();

// Database connection
connDb()

// Initializing the app
const app = express();

// Establishing the path for ES6 module
const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = "E:/Coding/MERN/Blog Application/server";

// Using middlewares for app
app.use(express.json());
app.use(cors({ credentials: true, origin:"http://localhost:3000"}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use('', express.static(path.join(__dirname, '')));
app.use(morgan('dev'));
app.use(helmet());
app.use(xss());
app.use(expMongoSanitize());
app.disable('x-powered-by')


// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v2/blog", blogRoute);


// Validation middleware
app.use(errorMiddleware);

// Defining the port
const port = process.env.PORT;
// Listening on port
app.listen(port, () => {
    console.log(`Server is listening live on port:${port}`)
})