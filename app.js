import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Conectar ao banco de dados
connectDB();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware
app.use(express.json({ extended: false }));

// Rotas
import eventosRoutes from './routes/eventos.js';
import inscricoesRoutes from './routes/inscricoes.js';
import authRoutes from './routes/auth.js';

app.get('/', () => {
  return 'Ola Mundi'
})

app.use('/api/eventos', eventosRoutes);
app.use('/api/inscricoes', inscricoesRoutes);
app.use('/api/auth', authRoutes);

export default app;
