import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Evento from '../models/Evento.js';
import Inscricao from '../models/Inscricao.js';

const router = express.Router();

// Recuperar evento por UID
router.get('/:uid', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.uid);
    if (!evento) {
      return res.status(404).json({ msg: 'Evento não encontrado' });
    }
    res.json(evento);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Cadastrar evento (com autenticação)
router.post('/', authMiddleware, async (req, res) => {
  const { nome, descricao, limiteInscricoes, palestrante, dia, sala } = req.body;

  try {
    const novoEvento = new Evento({
      nome,
      descricao,
      limiteInscricoes,
      palestrante,
      dia,
      sala,
    });

    const evento = await novoEvento.save();
    res.json(evento);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Recuperar integrantes de um evento (com autenticação)
router.get('/:uid/inscricoes', authMiddleware, async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.uid).populate('inscricoes');
    if (!evento) {
      return res.status(404).json({ msg: 'Evento não encontrado' });
    }
    res.json(evento.inscricoes);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

export default router;
