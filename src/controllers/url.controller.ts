import urlModel from "../models/url.model";
import ResponseGenerator from "../utils/response.generator";
import generateUniqueID from "../utils/uniqueId.generator";
import urlValidator from "../utils/url.validator";
import { Request, Response } from "express";
import { fetchExistingURL, fetchURLById, deleteExistingURL } from "../../services/url.services";

async function createShortenedURL( req : Request, res : Response){
    const { originalUrl } = req.body;
    const clientURL = req.protocol + '://' + req.get('host') + req.originalUrl;
    
    if(!urlValidator(originalUrl)) return ResponseGenerator.generateResponse(res, 400, "Invalid URL");

    try{

        const urlDocument = await fetchExistingURL(originalUrl);
        if(urlDocument){
            const shortenedURL = clientURL + urlDocument.urlId;
            return ResponseGenerator.generateResponse(res, 200, shortenedURL);
        }

        const urlId = await generateUniqueID();

        const newURLDocument = new urlModel({
            originalUrl,
            urlId,
            date: new Date()
        });

        await newURLDocument.save();

        const shortenedURL = clientURL + urlId;

        return ResponseGenerator.generateResponse(res, 200, shortenedURL);
    
    }catch(err){
        console.log(err);
        return ResponseGenerator.generateResponse(res, 500);
    }

}

async function redirectToOriginalURL(req : Request, res : Response){
    const { urlId } = req.params;
    
    try{
        const urlDocument = await fetchURLById(urlId);
        if(!urlDocument) return ResponseGenerator.generateResponse(res, 404);

        urlDocument.clicks += 1;
        await urlDocument.save();

        return res.redirect(urlDocument.originalUrl);
    }catch(err){
        console.log(err);
        return ResponseGenerator.generateResponse(res, 500);
    }
}

async function getURLStats(req : Request, res : Response){
    const { urlId } = req.params;

    try{
        const urlDocument = await fetchURLById(urlId);
        if(!urlDocument) return ResponseGenerator.generateResponse(res, 404);

        return ResponseGenerator.generateResponse(res, 200, urlDocument);
    }catch(err){
        console.log(err);
        return ResponseGenerator.generateResponse(res, 500);
    }
}

async function deleteURL(req : Request, res : Response){
    const { originalUrl } = req.body;

    try{
        const deletedUrl = await deleteExistingURL(originalUrl);
        if(!deletedUrl) return ResponseGenerator.generateResponse(res, 404, "URL not found");

        return ResponseGenerator.generateResponse(res, 200);
    }catch(err){
        console.log(err);
        return ResponseGenerator.generateResponse(res, 500);
    }
}

export{
    createShortenedURL,
    redirectToOriginalURL,
    getURLStats,
    deleteURL
}