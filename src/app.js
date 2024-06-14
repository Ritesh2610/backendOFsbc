import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));

// Use morgan middleware with the "dev" format
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"))
app.use(cookieParser());

// import Routes 
import userRoute from './routes/user.routes.js';
import fileRoute from './routes/pdf_File.routes.js';


app.use("/api/v1/users", userRoute)
app.use("/api/v1/file", fileRoute)

export { app } 