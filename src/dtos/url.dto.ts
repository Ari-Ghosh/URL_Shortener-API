import mongoose from "mongoose";

interface UrlDto extends mongoose.Document {
    originalUrl: string;
    shortUrl: string;
    date: Date;
    clicks: number;
}

export default UrlDto;