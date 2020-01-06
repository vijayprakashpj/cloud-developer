import { promises } from "fs";
import { Router, Request, Response } from "express";
import { filterImageFromURL, deleteLocalFiles } from "../../../../util/util";

import { requiresAuth } from "../auth/auth";

const router: Router = Router();

router.get("/",
    requiresAuth,
    async (req: Request, res: Response) => {
    const { image_url } = req.query;

    if (!image_url) {
        res.status(400).send("Invalid request. image_url is required.");
    }

    try {
        const filteredImagePath:string = await filterImageFromURL(image_url);
        res.sendFile(filteredImagePath, async (err) => {
            if (!err) {
                await deleteLocalFiles([filteredImagePath]);
            }
        });
    } catch (ex) {
        console.log(ex);
        res.status(422).send("Unable to process the image.");
    }
})

export const FilteredImageRouter: Router = router;