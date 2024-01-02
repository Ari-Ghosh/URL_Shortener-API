import { nanoid } from "nanoid";
import urlModel from "../models/url.model";

const generateUniqueID = async () => {
    let uniqueID = nanoid(10);
    let url = await urlModel.findOne({shortUrl: uniqueID});
    while(url){
        uniqueID = nanoid(10);
        url = await urlModel.findOne({shortUrl: uniqueID});
    }
    return uniqueID;
}

export default generateUniqueID;