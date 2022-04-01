import { Router } from "express";
import {
  authIndex,
  authRegister,
  authDelete,
  authUpdate,
  resetPassEmail,
  verifiedEmail,
  verifiedDelete,
} from "../controller/authController.js";

const authRouter = Router();
authRouter.post("/", authIndex);
authRouter.post("/register", authRegister);
authRouter.post("/emailReset", resetPassEmail);
authRouter.delete("/delete", authDelete);
authRouter.delete("/deleteEmail", verifiedDelete);
authRouter.patch("/update", authUpdate);
authRouter.post("/verified", verifiedEmail);

export default authRouter;
