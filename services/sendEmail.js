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

const sendEventEmail = async (toEmail, name, eventName, eventDescription, sala, eventDate, inscriptionId) => {
  const formattedDate = new Date(eventDate).toLocaleString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  
  const mailOptions = {
    from: 'Eventos Uniavan <'+process.env.EMAIL_USER+'>',
    to: 'caiomafra10@gmail.com',
    subject: 'Inscrição Confirmada!',
    html: `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Template</title>
<style>
 body {
  margin: 0;
  background-color: #5459F1 !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}



  .container {
    max-width: 600px; /* Defina a largura máxima do email */
    margin: 0 auto;
    padding: 20px;
  }
  .workshop-card {
    max-width: 500px; /* Largura máxima do card */
    width: 100%;
    margin-top: 50px;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 15px;
    background-color: #2b2d42; /* Cor de fundo do card */
    color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Efeito de elevação */
  }
</style>
</head>
<body>
<div class="container">
  <div class="workshop-card">
    <div class="card-body">
      <div class="text-center pt-3">
        <!-- Renderização do conteúdo -->
        <h1 style="font-size: 30px; margin: 0; margin-bottom: 15px;"><strong>Agradecimento pela Sua Inscrição!</strong></h1>
        
        <p1 style="font-size: 22px; margin: 0;"><strong>${eventName}</strong></p1>
        <p  style="color: #dee2e6bf; margin: 0;">${eventDescription}</p>
        <div style="margin-top: 25px; margin-bottom: 20px; padding: 20px;">
          <div style="text-align: center;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${inscriptionId}" alt="QR Code" style="width: 220px; height: 200px;">
          </div>
          <div style="text-align: left; margin-top: 20px; margin-bottom: 20px;">
            <p><strong>Inscrito:</strong> ${name}</p>
            <p><strong>Data:</strong> ${formattedDate}</p>
            <p><strong>Sala:</strong> ${sala}</p>
          </div>
        </div>
      </div>
    </div>  
  </div>
</div>
</body>
</html>
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
