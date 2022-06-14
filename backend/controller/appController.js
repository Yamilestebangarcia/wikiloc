import { messageError } from "../utility/messageError.js";
import multer from "multer";
import fs from "fs";
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
import Rute from "../db/models/ruta.js";
import User from "../db/models/user.js";
import { uploadMulter, urlUpload } from "../utility/uploadFile.js";
import path from "path";

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
      console.log("token", token);
      const decoded = jwt.verify(token, process.env.secret);
      console.log("decode", decoded);
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
      return res.status(401).json(messageError.Token);
    }
    res.status(200);
    res.json({ message: "ok" });
  });
};

const seeMap = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.log("1");
    return res.status(401).json(messageError.Token);
  }
  try {
    const decoded = jwt.verify(token, process.env.secret);

    if (!decoded.id) {
      console.log("2");
      return res.status(401).json(messageError.Token);
    }
  } catch (error) {
    console.log("3");
    return res.status(401).json(messageError.Token);
  }
  try {
    const rutes = await Rute.find().select({
      title: 1,
      distance: 1,
      slopePositive: 1,
      lat: 1,
      lon: 1,
    });

    console.log(rutes);
    res.status(200).json(rutes);
  } catch (error) {
    return res.status(500).json(messageError.Later);
  }
};

const findRute = async (req, res) => {
  const { token } = req.body;
  const { search } = req.body;
  if (!token) {
    return res.status(401).json(messageError.Token);
  }
  try {
    const decoded = jwt.verify(token, process.env.secret);

    if (!decoded.id) {
      return res.status(401).json(messageError.Token);
    }
  } catch (error) {
    return res.status(401).json(messageError.Token);
  }
  try {
    const findRute = await Rute.find(
      {
        title: { $regex: search, $options: "i" },
      },
      { title: 1, distance: 1, slopePositive: 1, lat: 1, lon: 1, difficulty: 1 }
    );
    /*     console.log(await Rute.find({}, { title: 1 }));
    console.log(findRute); */
    return res.status(200).json(findRute);
  } catch (error) {
    return res.status(500).json(messageError.Later);
  }
};
const view = async (req, res) => {
  const { token } = req.body;
  const { idRute } = req.body;
  if (!token) {
    return res.status(401).json(messageError.Token);
  }
  try {
    const decoded = jwt.verify(token, process.env.secret);

    if (!decoded.id) {
      return res.status(401).json(messageError.Token);
    }
  } catch (error) {
    return res.status(401).json(messageError.Token);
  }

  try {
    const ruteData = await Rute.findById(idRute, {
      userName: 1,
      difficulty: 1,
      description: 1,
      title: 1,
      url: 1,
      date: 1,
      distance: 1,
      slopePositive: 1,
      slopeNegative: 1,
      maximumHeight: 1,
      minimunHeight: 1,
      lat: 1,
      lon: 1,
    });

    res.status(200).json(ruteData);
  } catch (error) {
    return res.status(500).json(messageError.Later);
  }
};
const viewTrack = async (req, res) => {
  const { token } = req.body;
  const { idRute } = req.body;
  if (!token) {
    return res.status(401).json(messageError.Token);
  }
  try {
    const decoded = jwt.verify(token, process.env.secret);

    if (!decoded.id) {
      return res.status(401).json(messageError.Token);
    }
  } catch (error) {
    return res.status(401).json(messageError.Token);
  }
  try {
    const ruteData = await Rute.findById(idRute, {
      userName: 1,
      difficulty: 1,
      description: 1,
      title: 1,
      url: 1,
      date: 1,
      distance: 1,
      slopePositive: 1,
      slopeNegative: 1,
      maximumHeight: 1,
      minimunHeight: 1,
      lat: 1,
      lon: 1,
    });

    let text;
    try {
      const pathUploads = path.join(
        path.resolve(path.dirname("")),
        "uploads",
        ruteData.url
      );

      text = fs.readFileSync(pathUploads, "utf8");
    } catch (err) {
      return res.status(500).json(messageError.NotFile);
    }

    res.status(200).type("application/xml").send(text);
  } catch (error) {
    return res.status(500).json(messageError.Later);
  }
};

const index = async (req, res) => {
  let decoded;
  const { limit } = req.body;
  const { token } = req.body;
  const { skip } = req.body;

  if (!token) {
    return res.status(401).json(messageError.Token);
  }
  try {
    decoded = jwt.verify(token, process.env.secret);

    if (!decoded.id) {
      return res.status(401).json(messageError.Token);
    }
  } catch (error) {
    return res.status(401).json(messageError.Token);
  }
  try {
    /*    const findRutes = await Rute.find(
      {
        user: decoded.id,
      },
      {
        difficulty: 1,
        description: 1,
        title: 1,
        distance: 1,
        slopePositive: 1,
        lat: 1,
        lon: 1,
        date: 1,
      }
    ); */

    let findRutes;
    if (skip) {
      findRutes = await Rute.find(
        {
          user: decoded.id,
        },
        {
          difficulty: 1,
          description: 1,
          title: 1,
          distance: 1,
          slopePositive: 1,
          lat: 1,
          lon: 1,
          date: 1,
        }
      )
        .skip(skip)
        .sort({
          _id: -1,
        })
        .limit(limit);
      return res.status(200).json({ rute: findRutes, skip });
    } else {
      const skip = 0;
      const elements = (findRutes = await Rute.find(
        {
          user: decoded.id,
        },
        {}
      ).count());

      findRutes = await Rute.find(
        {
          user: decoded.id,
        },
        {
          difficulty: 1,
          description: 1,
          title: 1,
          distance: 1,
          slopePositive: 1,
          lat: 1,
          lon: 1,
          date: 1,
        }
      )
        .skip(skip)
        .sort({
          _id: -1,
        })
        .limit(limit);
      return res.status(200).json({ rute: findRutes, skip, elements });
    }
  } catch (error) {
    return res.status(500).json(messageError.DataBase);
  }
};
export { upload, seeMap, findRute, view, viewTrack, index };
