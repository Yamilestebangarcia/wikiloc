import User from "../db/user.js";
import {
  validationEmail,
  validationPass,
  validationName,
} from "../utility/validation.js";
import "../utility/dotenv.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { messageError } from "../utility/messageError.js";
import { enviarEmail } from "../utility/enviarCorreo.js";

const authIndex = async (req, res) => {
  const { email } = req.body;
  const { pass } = req.body;

  if (!validationEmail(email) || !validationPass(pass)) {
    return res.status(400).send(messageError.EmailPass);
  }

  const userFind = await User.findOne({ email });
  if (!userFind) {
    return res.status(400).send(messageError.EmailPass);
  }
  const compareHash = await bcrypt.compare(pass, userFind.pass);

  if (!compareHash) {
    return res.status(400).send(messageError.EmailPass);
  }
  if (!userFind.verified) {
    const token = jwt.sign(
      {
        id: userFind.id,
      },
      process.env.SECRET,
      { expiresIn: 600 }
    ); //10 min
    return enviarEmail(
      "Verifica tu email",
      process.env.UrlVerified,
      token,
      userFind.email,
      (err, inf) => {
        if (inf) {
          console.log("enviado");
          return res.status(400).send(messageError.Verification);
        }
        if (err) {
          console.log("err", err);
          return res.status(500).send(messageError.Later);
        }
      }
    );
  }

  const token = jwt.sign({ id: userFind.id }, process.env.SECRET, {
    expiresIn: "1h",
  });

  console.log(token);

  return res.status(200).json({ token, name: userFind.name });
};

const authRegister = async (req, res) => {
  const { email } = req.body;
  const { pass } = req.body;
  const { name } = req.body;
  console.log("si");
  if (
    !validationEmail(email) ||
    !validationPass(pass) ||
    !validationName(name)
  ) {
    console.log("Email,pass, name");
    return res.status(400).send(messageError.EmailPassName);
  }
  const userFind = await User.findOne({ email });
  if (userFind) {
    return res.status(400).send(messageError.EmailUsed);
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  const newUser = User({
    email,
    pass: hash,
    verified: false,
    name: name,
  });

  const saveUser = await newUser.save();
  if (!saveUser) {
    console.log("err: bd");
    return res.status(500).send(messageError.Later);
  }
  const token = jwt.sign(
    {
      id: saveUser.id,
    },
    process.env.SECRET,
    { expiresIn: 600 }
  ); //10 min
  console.log(saveUser.email);
  enviarEmail(
    "Verifica tu email",
    process.env.UrlVerified,
    token,
    saveUser.email,
    (err, inf) => {
      if (inf) {
        console.log("enviado");
        return res.sendStatus(200);
      }
      if (err) {
        console.log("err", err);
        return res.status(500).send(messageError.Later);
      }
    }
  );

  res.sendStatus(201);
};

const authDelete = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.log("no token");
    return res.sendStatus(403);
  }
  try {
    const decoded = jwt.verify(token, process.env.secret);
    const userFind = await User.findById(decoded.id);
    if (!userFind) {
      console.log("no existe usuario");
      return res.sendStatus(400);
    }

    const deleteUser = await User.findByIdAndRemove(userFind.id);

    if (!deleteUser) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log("Erro hash");
    console.log(error);
    return res.sendStatus(401);
  }
};

const authUpdate = async (req, res) => {
  const { pass } = req.body;
  const { token } = req.body;
  if (!validationPass(pass)) {
    console.log("validation pass");
    return res.status(400).send(messageError.Pass);
  }

  if (!token) {
    console.log("no token");
    return res.status(403).send(messageError.Token);
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);
    console.log(decoded);
    const userFind = await User.findById(decoded.id);

    if (!userFind) {
      console.log("no existe usuario");
      return res.status(400).send(messageError.Token);
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(pass, salt);

    const updateUser = await User.findByIdAndUpdate(userFind.id, {
      pass: hash,
    });

    if (!updateUser) {
      console.log("error guardar contraseña");
      return res.status(500).send(messageError.Later);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log("Erro hash");
    return res.status(401).send(messageError.Token);
  }
};
const resetPassEmail = async (req, res) => {
  const { email } = req.body;
  if (!validationEmail(email)) {
    return res.status(400).send(messageError.Email);
  }
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.status(400).send(messageError.Email);
  }
  const token = jwt.sign(
    {
      id: findUser.id,
    },
    process.env.SECRET,
    { expiresIn: 600 }
  ); //10 min

  enviarEmail(
    "Recupera tu password",
    process.env.urlPass,
    token,
    findUser.email,
    (err, inf) => {
      if (inf) {
        console.log("enviado");
        return res.sendStatus(200);
      }
      if (err) {
        console.log("err", err);
        return res.sendStatus(500);
      }
    }
  );
};
const verifiedEmail = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    console.log("no token");
    return res.status(403);
  }
  try {
    const decoded = jwt.verify(token, process.env.secret);

    const updateUser = await User.findByIdAndUpdate(decoded.id, {
      verified: true,
    });

    if (!updateUser) {
      console.log("error guardar verificar");
      return res.sendStatus(500);
    }
    console.log(updateUser);
    return res.sendStatus(200);
  } catch (error) {
    console.log("Erro hash");
    return res.sendStatus(401);
  }
};
const verifiedDelete = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    console.log("no token");
    return res.status(403);
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);

    if (!decoded.id) {
      console.log("no id");
      return res.status(400).send(messageError.Token);
    }

    const findUser = await User.findById(decoded.id);
    if (!findUser) {
      console.log("no user");
      return res.status(400).send(messageError.Token);
    }

    const tokenEmail = jwt.sign(
      {
        id: decoded.id,
      },
      process.env.SECRET,
      { expiresIn: 600 }
    ); //10 min
    enviarEmail(
      "elimina tu usuario",
      process.env.UrlDelete,
      tokenEmail,
      findUser.email,
      (err, inf) => {
        if (inf) {
          console.log("enviado");
          return res.sendStatus(200);
        }
        if (err) {
          console.log("err", err);
          return res.sendStatus(500);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(messageError.Token);
  }
};

export {
  authIndex,
  authRegister,
  authDelete,
  authUpdate,
  resetPassEmail,
  verifiedEmail,
  verifiedDelete,
};
