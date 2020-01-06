import { NextFunction } from "connect";
import { Request, Response } from "express";
import { config } from "../../../../config/config";

export function requiresAuth(req: Request, res: Response, next: NextFunction) {
    const { api_key } = req.query;

    // Skip authentication for non-Prod environments
    if (config.env.toLowerCase() != 'prod') {
        return next();
    }

    if (!api_key) {
        return res.status(403).send("API key is missing.");
    }

    // Compare the API key values
    if (api_key == config.api_key) {
        return next();
    } else {
        return res.status(403).send("Not authorized.");
    }
}