import express from 'express';
import Admin from '../models/Admin.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// Login de administrador
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    if (!admin.active) {
      return res.status(401).json({ error: 'Conta desativada' });
    }

    const token = generateToken(admin._id);

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

export default router;
