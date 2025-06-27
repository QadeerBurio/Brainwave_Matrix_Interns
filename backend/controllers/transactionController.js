import Transaction from '../models/Transaction.js';

// 🔹 Get all transactions for the logged-in user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch transactions', error: err.message });
  }
};

// 🔹 Add new transaction
export const addTransaction = async (req, res) => {
  try {
    const tx = new Transaction({ ...req.body, userId: req.user.id });
    await tx.save();
    res.status(201).json(tx);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to add transaction', error: err.message });
  }
};

// 🔹 Delete transaction securely (checks ownership)
export const deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!tx) return res.status(404).json({ msg: 'Transaction not found or unauthorized' });
    res.json({ msg: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Delete failed', error: err.message });
  }
};

// 🔹 Update transaction securely (checks ownership)
export const updateTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!tx) return res.status(404).json({ msg: 'Transaction not found or unauthorized' });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ msg: 'Update failed', error: err.message });
  }
};

// 🔹 Paginated transactions for logged-in user
export const getPaginatedTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const userId = req.user.id;

    const transactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments({ userId });

    res.json({
      transactions,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Pagination error', error: err.message });
  }
};
