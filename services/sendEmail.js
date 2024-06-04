import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEventEmail = async (toEmail, name, eventName, eventDate, image) => {
  const mailOptions = {
    from: 'Eventos Uniavan <'+process.env.EMAIL_USER+'>',
    to: 'caiomafra10@gmail.com',
    subject: 'Inscrição Confirmada!',
    html: `
      <h2>Olá ${name},</h2>
      <p>Você se inscreveu no evento <strong>${eventName}</strong> que ocorrerá no dia <strong>${eventDate}</strong>.</p>
      <p><img src="${image}" alt="${eventName}" style="width:100%;max-width:600px;" /></p>
      <p>Estamos ansiosos para vê-lo lá!</p>
      <p>Atenciosamente,<br>Equipe Uniavan</p>
    `
  };

  try {
    const res = await transport.sendMail(mailOptions);
    console.log(res)
    return true;
  } catch (error) {
    throw error;
  }
};

export { sendEventEmail };
