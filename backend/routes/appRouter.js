import { Router } from "express";
import {
  upload,
  seeMap,
  findRute,
  view,
  viewTrack,
  index,
  setComents,
  getComents,
  calification,
} from "../controller/appController.js";

const appRouter = Router();
appRouter.post("/index", index);
appRouter.post("/upload", upload);
appRouter.post("/seemap", seeMap);
appRouter.post("/find", findRute);
appRouter.post("/view", view);
appRouter.post("/viewTrack", viewTrack);
appRouter.post("/setCalification", calification);
appRouter.post("/setComents", setComents);
appRouter.post("/GetComents", getComents);

export default appRouter;
