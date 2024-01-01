import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";


dotenv.config();

const port : number = Number(process.env.PORT || 8000);

const app : Express = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get('/',async (req:Request, res:Response) =>{
    res.send(`API running successfully since ${new Date()}`);
})

app.get('/temp',async (req:Request, res:Response) =>{
    res.send(`Hello Let's Dive deep into the project`);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})