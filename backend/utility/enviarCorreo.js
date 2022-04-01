import nodemailer from "nodemailer";
import "../utility/dotenv.js";
if (process.env.NODE_ENV !== "production") {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

export const enviarEmail = (subject, url, token, email, cb) => {
  transport.sendMail(
    {
      from: '"wikiloc"<wikiloc@wikiloc.com>',
      to: email,
      subject: subject,
      html: `<h1>${subject}</h1><a href="${url}?token=${token}">${subject}</a><br/><p>expira en 30 minutos</p>`,
    },
    cb
  );
};
