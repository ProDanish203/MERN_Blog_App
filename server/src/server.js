// Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import "express-async-errors";
// Config Imports
import connDb from "../Config/db.js";
// Routes Imports
import authRoute from "../Routes/authRoute.js";
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

// Using middlewares for app
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(xss());
app.use(expMongoSanitize());
app.disable('x-powered-by')


// Routes
app.use("/api/v1/auth", authRoute);


// Validation middleware
app.use(errorMiddleware);

// Defining the port
const port = process.env.PORT;
// Listening on port
app.listen(port, () => {
    console.log(`Server is listening live on port:${port}`)
})