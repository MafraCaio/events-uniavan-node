import mongoose from 'mongoose';

const InscricaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  estudanteUniavan: { type: Boolean, required: true },
  comoSoubeDoEvento: { type: String, required: true },
  evento: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento', required: true },
});

const Inscricao = mongoose.model('Inscricao', InscricaoSchema);

export default Inscricao;
