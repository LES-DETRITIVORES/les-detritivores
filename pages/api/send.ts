import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnathorized: false,
    },
    auth: {
      user: "bonjour@les-detritivores.co",
      pass: "Brazza33!",
    },
  });

  const mailData = {
    from: "bonjour@les-detritivores.co",
    to: req.body.email,
    subject: `Message From ${req.body.name}`,
    text: `[Devis] \n\n Vous êtes: ${req.body.who} \n Nombre de repas servis par j: ${req.body.numbers} \n Structure: ${req.body.struct}\n Fonction: ${req.body.fonction}\n Nom: ${req.body.name}\n Prénom: ${req.body.lastName}\n Email: ${req.body.email}\n Téléphone: ${req.body.phone}\n\n${req.body.message}`,
    html: `[Devis] <br/><br/> Vous êtes: ${req.body.who} <br/> Nombre de repas servis par j: ${req.body.numbers} <br /> Structure: ${req.body.struct}<br /> Fonction: ${req.body.fonction}<br /> Nom: ${req.body.name}<br /> Prénom: ${req.body.lastName}<br /> Email: ${req.body.email}<br /> Téléphone: ${req.body.phone}<br /><br />${req.body.message}`,
  };

  transporter.sendMail(mailData, (err: any, info: any) => {
    if (err) console.log(err);
    else console.log(info);
  });

  res.send("data sent");
}
