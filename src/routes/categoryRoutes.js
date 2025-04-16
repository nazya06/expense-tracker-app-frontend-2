import express from 'express';
import { Category } from '../models/index.js';

const router = express.Router();

router.post('/seed', async (req, res) => {
  try {
    const defaultCategories = [
      { name: 'Food' },
      { name: 'Transport' },
      { name: 'Entertainment' },
      { name: 'Utilities' },
    ];

  }
});

export default router;
