import express from "express";
import cors from "cors";

import authRouter from "./routes/authRouter.js";
import appRouter from "./routes/appRouter.js";
import "./utility/dotenv.js";
import "./db/connect.js";

const app = express();
const port = process.env.port || 3002;
app.use(express.json());
app.use(cors());

app.use("/login", authRouter);
app.use("/app", appRouter);
app.listen(port, () => console.log(`escuchado en el puerto ${port}`));
