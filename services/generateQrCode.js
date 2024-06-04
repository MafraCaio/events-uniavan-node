import QRCode from 'qrcode';

/**
 * Função para gerar um QR code a partir de um texto.
 * @param {string} text O texto a ser codificado no QR code.
 * @returns {Promise<string>} A URL de dados base64 do QR code.
 */
const generateQrCodeBase64 = async (text) => {
  try {
    // Gerar QR code com o texto fornecido
    const qrCodeDataURL = await QRCode.toDataURL(text);
    console.log(qrCodeDataURL)
    return qrCodeDataURL;
  } catch (error) {
    console.error('Erro ao gerar o QR code:', error);
    throw error;
  }
};

// Exporta a função para que possa ser usada em outros arquivos
export { generateQrCodeBase64 };
