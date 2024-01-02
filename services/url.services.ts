import urlModel from "../src/models/url.model";
import UrlDto from "../src/dtos/url.dto";

const fetchExistingURL = async (url : string) : Promise<UrlDto | null> => urlModel.findOne({originalUrl : url});

const fetchURLById = async (uniqueId : string) : Promise<UrlDto | null> => urlModel.findOne({urlId : uniqueId});

const deleteExistingURL = async (url : string) : Promise<UrlDto | null> => urlModel.findOneAndDelete({originalUrl : url});

export {
    fetchExistingURL,
    fetchURLById,
    deleteExistingURL
}