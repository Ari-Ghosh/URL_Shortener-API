import { fetchURLById } from "../../services/url.services";

const generateRandomString = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    return randomString;
}

const generateUniqueID = async(): Promise<string> => {
    const uniqueID = generateRandomString();
    const urlDocument = await fetchURLById(uniqueID);
    if(urlDocument) return generateUniqueID();
    return uniqueID;
}

export default generateUniqueID;