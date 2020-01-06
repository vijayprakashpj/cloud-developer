import { Request, Response, Router } from 'express';
import { FilteredImageRouter } from './filteredimage/filteredimage.index.router';

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("v0");
})

router.use("/filteredimage", FilteredImageRouter);

export const IndexRouter: Router = router;