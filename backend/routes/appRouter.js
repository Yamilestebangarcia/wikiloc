import { Router } from "express";
import { upload, seeMap } from "../controller/appController.js";

const appRouter = Router();

appRouter.post("/upload", upload);
appRouter.post("/seemap", seeMap);

export default appRouter;
