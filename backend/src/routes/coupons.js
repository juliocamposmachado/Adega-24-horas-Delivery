import express from 'express';
import Coupon from '../models/Coupon.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Listar cupons (admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    console.error('Erro ao listar cupons:', error);
    res.status(500).json({ error: 'Erro ao listar cupons' });
  }
});

// Criar cupom (admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (error) {
    console.error('Erro ao criar cupom:', error);
    res.status(500).json({ error: 'Erro ao criar cupom' });
  }
});

// Atualizar cupom (admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!coupon) {
      return res.status(404).json({ error: 'Cupom não encontrado' });
    }

    res.json(coupon);
  } catch (error) {
    console.error('Erro ao atualizar cupom:', error);
    res.status(500).json({ error: 'Erro ao atualizar cupom' });
  }
});

// Deletar cupom (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({ error: 'Cupom não encontrado' });
    }

    res.json({ message: 'Cupom deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar cupom:', error);
    res.status(500).json({ error: 'Erro ao deletar cupom' });
  }
});

export default router;
