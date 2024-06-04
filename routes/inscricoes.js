import express from 'express';
import Evento from '../models/Evento.js';
import Inscricao from '../models/Inscricao.js';
import { generateQrCodeBase64 } from '../services/generateQrCode.js';
import { sendEventEmail } from '../services/sendEmail.js';

const router = express.Router();

// Realizar inscrição em um evento
router.post('/', async (req, res) => {
  const { nome, dataNascimento, email, telefone, estudanteUniavan, comoSoubeDoEvento, eventoId } = req.body;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({ msg: 'Evento não encontrado' });
    }

    if (evento.inscricoes.length >= evento.limiteInscricoes) {
      return res.status(400).json({ msg: 'Limite de inscrições atingido' });
    }

    // Verifica se já existe uma inscrição com o mesmo e-mail para o evento
    const inscricaoExistente = await Inscricao.findOne({ email, evento: eventoId });
    if (inscricaoExistente) {
      return res.status(400).json({ msg: 'E-mail já cadastrado neste evento' });
    }

    const novaInscricao = new Inscricao({
      nome,
      dataNascimento,
      email,
      telefone,
      estudanteUniavan,
      comoSoubeDoEvento,
      evento: eventoId,
    });

    const inscricao = await novaInscricao.save();

    // Recupera o ID da inscrição
    const inscricaoId = inscricao._id;

    evento.inscricoes.push(inscricao);
    await evento.save();

    // Gerar QR Code
    try {
      const qrCode = await generateQrCodeBase64(inscricaoId);
    } catch (error) {

    }
    
    try {
      const sendEmail = await sendEventEmail(inscricao.email, inscricao.nome, evento.nome, evento.dia, qrCode);
    } catch (error) {

    }
    

    res.json(inscricao);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

export default router;
