import UrlDto from "../dtos/url.dto";
import { Model, Schema, model } from "mongoose";

const urlSchema : Schema<UrlDto> = new Schema(
    {
        originalUrl: {
            type: String, 
            required: true
        },
        urlId: {
            type: String, 
            required: true, 
            unique: true
        },
        date: {
            type: Date, 
            default: Date.now
        },
        clicks: {
            type: Number, 
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const urlModel : Model<UrlDto> = model("url", urlSchema);

export default urlModel;