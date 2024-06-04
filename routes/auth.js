import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Registrar usuário
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    usuario = new Usuario({ nome, email, senha });

    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(senha, salt);

    await usuario.save();

    const payload = { user: { id: usuario.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Login do usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const payload = { user: { id: usuario.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

export default router;
