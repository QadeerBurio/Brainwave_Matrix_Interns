import React, { useState } from 'react';
import axios from 'axios';

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    type: 'expense',
    category: '',
    amount: '',
    date: '',
    description: ''
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/transactions/add',
        form,
        {
          headers: { Authorization: token }
        }
      );
      onAdd(res.data);
      setForm({ type: 'expense', category: '', amount: '', date: '', description: '' });
    } catch (err) {
      alert('❌ Failed to add transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={titleStyle}>➕ Add Transaction</h3>

      <div style={rowStyle}>
        <select name="type" onChange={handleChange} value={form.type} style={selectStyle}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="📂 Category"
          style={inputStyle}
          required
        />
      </div>

      <div style={rowStyle}>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="💰 Amount"
          style={inputStyle}
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="📝 Description"
        style={textareaStyle}
        rows={3}
      />

      <button type="submit" style={buttonStyle}>➕ Add Transaction</button>

      {/* Animations & Focus Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        form {
          animation: fadeInUp 0.6s ease-in-out;
        }

        button:hover {
          background-color: #218838;
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #28a745;
          box-shadow: 0 0 6px rgba(40, 167, 69, 0.3);
        }
      `}</style>
    </form>
  );
}

// 🎨 Styles
const formStyle = {
  background: '#ffffff',
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 0 16px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  maxWidth: '500px'
};

const inputStyle = {
  flex: 1,
  padding: '10px',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  minWidth: '100px',
  transition: 'all 0.2s'
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer'
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical'
};

const buttonStyle = {
  padding: '12px',
  backgroundColor: '#28a745',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const rowStyle = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap'
};

const titleStyle = {
  marginBottom: '8px',
  color: '#333',
  fontWeight: 'bold',
  fontSize: '1.3rem'
};

export default TransactionForm;
