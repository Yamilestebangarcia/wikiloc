import { Router } from "express";
import {
  upload,
  seeMap,
  findRute,
  view,
  viewTrack,
} from "../controller/appController.js";

const appRouter = Router();

appRouter.post("/upload", upload);
appRouter.post("/seemap", seeMap);
appRouter.post("/find", findRute);
appRouter.post("/view", view);
appRouter.post("/viewTrack", viewTrack);

export default appRouter;
