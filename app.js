import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

dotenv.config();

const app = express();

// Conectar ao banco de dados

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware
app.use(express.json({ extended: false }));

// Rotas
import eventosRoutes from "./routes/eventos.js";
import inscricoesRoutes from "./routes/inscricoes.js";
import authRoutes from "./routes/auth.js";

app.get("/", () => {
  return "Ola Mundo";
});

app.use("/api/eventos", eventosRoutes);
app.use("/api/inscricoes", inscricoesRoutes);
app.use("/api/auth", authRoutes);

if (process.env.LOCAL === "production") {
  const privateKey = fs.readFileSync("privatekey.pem", "utf8");
  const certificate = fs.readFileSync("certificate.pem", "utf8");

  const credentials = { key: privateKey, cert: certificate };

  // Crie o servidor HTTPS
  const httpsServer = https.createServer(credentials, app);

  // Inicie o servidor HTTPS
  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
}

export default app;
