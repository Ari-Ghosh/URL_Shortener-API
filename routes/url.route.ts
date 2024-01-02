import { Router, Request, Response } from "express";

const urlRouter : Router = Router();

urlRouter.get("/", async (req: Request, res: Response) => {
    res.send(`URL Route sucessfully working since ${new Date()}`);
});

export default urlRouter;