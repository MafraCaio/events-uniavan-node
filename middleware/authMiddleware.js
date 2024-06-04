import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('authorization');

  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};

export default authMiddleware;
