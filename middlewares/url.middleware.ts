import { Request, Response, NextFunction } from 'express';

const urlMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('URL Middleware');
    next();
};

export default urlMiddleware;