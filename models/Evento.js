import mongoose from 'mongoose';

const EventoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  limiteInscricoes: { type: Number, required: true },
  palestrante: { type: String, required: true },
  dia: { type: Date, required: true },
  sala: { type: String, required: true },
  inscricoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inscricao' }],
});

const Evento = mongoose.model('Evento', EventoSchema);

export default Evento;
