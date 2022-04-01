import { messageError } from "../utility/messageError.js";
import multer from "multer";
import {
  validationDifficulty,
  validationDescription,
  validationName,
  validationDate,
  validationDistance,
  validationCords,
  validationSlope,
} from "../utility/validation.js";
import jwt from "jsonwebtoken";
import "../utility/dotenv.js";
import Rute from "../db/ruta.js";
import User from "../db/user.js";
import { uploadMulter, urlUpload } from "../utility/uploadFile.js";

const upload = (req, res) => {
  uploadMulter(req, res, async function (err) {
    const { token } = req.body;
    const { title } = req.body;
    const { description } = req.body;
    const { difficulty } = req.body;
    const { date } = req.body;
    const { distance } = req.body;
    const { lat } = req.body;
    const { lon } = req.body;
    const { min } = req.body;
    const { max } = req.body;
    const { negative } = req.body;
    const { positive } = req.body;
    console.log(req.boy);
    if (
      !validationName(title) |
      !validationDifficulty(difficulty) |
      !validationDescription(description) |
      !token
    ) {
      return res.status(400).json(messageError.DescriptionTitleDifficulty);
    }

    if (
      !validationCords(lat) |
      !validationCords(lon) |
      !validationDate(date) |
      !validationDistance(distance) |
      !validationSlope(positive) |
      !validationSlope(negative) |
      !validationSlope(min) |
      !validationSlope(max)
    ) {
      return res.status(400).json(messageError.fileData);
    }

    if (req.fileValidationError) {
      return res.status(415).json(messageError.FileType);
    }

    if (err instanceof multer.MulterError) {
      return res.status(415).json(messageError.FileType);
    }
    if (err) {
      return res.status(500).json(messageError.Later);
    }

    try {
      const decoded = jwt.verify(token, process.env.secret);
      console.log(decoded);
      const UserFind = await User.findById(decoded.id);

      const newRute = Rute({
        title,
        difficulty,
        description,
        user: decoded.id,
        userName: UserFind.name,
        url: urlUpload,
        date,
        distance,
        slopePositive: positive,
        slopeNegative: negative,
        maximumHeight: max,
        minimunHeight: min,
        lat,
        lon,
      });

      const saveRute = await newRute.save();
      console.log(saveRute);
    } catch (error) {
      return res.status(400).json(messageError.Token);
    }
    res.status(200);
    res.json({ message: "ok" });
  });
};

const seeMap = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json(messageError.Token);
  }
  try {
    const decoded = jwt.verify(token, process.env.secret);

    if (!decoded.id) {
      return res.status(400).json(messageError.Token);
    }
  } catch (error) {
    return res.status(400).json(messageError.Token);
  }

  const rutes = await Rute.find().select({
    title: 1,
    distance: 1,
    slopePositive: 1,
    lat: 1,
    lon: 1,
  });

  console.log(rutes);
  res.status(200).json(rutes);
};

export { upload, seeMap };
