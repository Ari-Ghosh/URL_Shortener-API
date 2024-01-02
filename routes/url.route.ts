import { Router, Request, Response } from "express";
import { createShortenedURL, redirectToOriginalURL, getURLStats, deleteURL } from "../src/controllers/url.controller";
import urlMiddleware from "../middlewares/url.middleware";
import { url } from "inspector";

const urlRouter : Router = Router();

urlRouter.get("/test", async (req: Request, res: Response) => {
    res.send(`URL Route sucessfully working since ${new Date()}`);
});

urlRouter.post(
    "/", 
    createShortenedURL,
    urlMiddleware
);

urlRouter.get(
    "/:uniqueID", 
    redirectToOriginalURL,
    urlMiddleware
);

urlRouter.get(
    "/:uniqueID/stats", 
    getURLStats,
    urlMiddleware
);

urlRouter.delete(
    "/",
    deleteURL,
    urlMiddleware
);

export default urlRouter;