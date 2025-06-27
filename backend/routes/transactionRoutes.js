import express from 'express';
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getPaginatedTransactions
} from '../controllers/transactionController.js';

import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', auth, addTransaction);
router.get('/', auth, getTransactions);
router.delete('/:id', auth, deleteTransaction);
router.put('/update/:id', auth, updateTransaction);
router.get('/paged', auth, getPaginatedTransactions);

export default router;
