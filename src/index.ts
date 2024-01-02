import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import urlRouter from "../routes/url.route";
import { connect } from "./configs/db.config";

dotenv.config();

const port : number = Number(process.env.PORT || 8000);

const app : Express = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/url", urlRouter);

app.get('/',async (req:Request, res:Response) =>{
    res.send(`API running successfully since ${new Date()}`);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    connect();
})