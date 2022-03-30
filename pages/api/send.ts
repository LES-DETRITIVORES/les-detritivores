import { Data } from "libs/types";
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
  const {
    name,
    who,
    numbers,
    structure,
    dfunction,
    lastname,
    phone,
    message,
    email,
  }: Data = req.body;
  if (req.body.type === "compost") {
    const mailData = {
      from: "bonjour@les-detritivores.co",
      to: email,
      subject: `Message From ${name}`,
      text: `[Devis] \n\n Vous êtes: ${who} \n Nombre de repas servis par j: ${numbers} \n Structure: ${structure}\n Fonction: ${dfunction}\n Nom: ${name}\n Prénom: ${lastname}\n Email: ${email}\n Téléphone: ${phone}\n\n${message}`,
      html: `[Devis] <br/><br/> Vous êtes: ${who} <br/> Nombre de repas servis par j: ${numbers} <br /> Structure: ${structure}<br /> Fonction: ${dfunction}<br /> Nom: ${name}<br /> Prénom: ${lastname}<br /> Email: ${email}<br /> Téléphone: ${phone}<br /><br />${message}`,
    };

    transporter.sendMail(mailData, (err: any) => {
      if (err) res.status(500).json({ error: err });
      else res.status(200).json({ message: "success" });
    });
  } else if (req.body.type === "client") {
    const mailData = {
      from: "bonjour@les-detritivores.co",
      to: email,
      subject: `Message test one ${name}`,
      text: `[Devis] \n\n Vous êtes: ${who} \n Nombre de repas servis par j: ${numbers} \n Structure: ${structure}\n Fonction: ${dfunction}\n Nom: ${name}\n Prénom: ${lastname}\n Email: ${email}\n Téléphone: ${phone}\n\n${message}`,
      html: `[Devis] <br/><br/> Vous êtes: ${who} <br/> Nombre de repas servis par j: ${numbers} <br /> Structure: ${structure}<br /> Fonction: ${dfunction}<br /> Nom: ${name}<br /> Prénom: ${lastname}<br /> Email: ${email}<br /> Téléphone: ${phone}<br /><br />${message}`,
    };

    transporter.sendMail(mailData, (err: any) => {
      if (err) res.status(500).json({ error: err });
      else res.status(200).json({ message: "success" });
    });
  }
}
