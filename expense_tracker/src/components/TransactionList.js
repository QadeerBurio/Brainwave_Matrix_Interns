import React, { useState } from 'react';
import axios from 'axios';

function TransactionList({ transactions, onDelete }) {
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    category: '',
    amount: '',
    description: ''
  });

  const handleEditClick = (tx) => {
    setEditing(tx._id);
    setEditForm({
      category: tx.category,
      amount: tx.amount,
      description: tx.description || ''
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(`http://localhost:5000/api/transactions/update/${id}`, editForm, {
        headers: { Authorization: token }
      });
      onDelete(id);         // Remove old one
      onDelete(null);       // Trigger refresh from parent (Dashboard re-fetch)
      setEditing(null);     // Exit editing mode
    } catch (err) {
      alert('❌ Update failed');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/transactions/delete/${id}`, {
        headers: { Authorization: token }
      });
      onDelete(id); // Update parent
    } catch (err) {
      alert('❌ Delete failed');
    }
  };

  return (
    <div style={wrapperStyle}>
      <h3 style={{ marginBottom: '1rem' }}>📋 Transaction List</h3>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        transactions.map(tx => (
          <div key={tx._id} style={cardStyle}>
            {editing === tx._id ? (
              <>
                <input
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  style={inputStyle}
                />
                <input
                  name="amount"
                  type="number"
                  value={editForm.amount}
                  onChange={handleEditChange}
                  style={inputStyle}
                />
                <input
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  style={inputStyle}
                />
                <button style={updateBtn} onClick={() => handleUpdate(tx._id)}>✅ Save</button>
                <button style={cancelBtn} onClick={() => setEditing(null)}>❌ Cancel</button>
              </>
            ) : (
              <>
                <div>
                  <strong style={{ color: tx.type === 'income' ? '#28a745' : '#dc3545' }}>
                    {tx.type.toUpperCase()}
                  </strong>{' '}
                  - {tx.category} - ₹{tx.amount} - {new Date(tx.date).toLocaleDateString()}
                  {tx.description && ` | ${tx.description}`}
                </div>
                <div style={buttonGroup}>
                  <button style={editBtn} onClick={() => handleEditClick(tx)}>✏️ Edit</button>
                  <button style={deleteBtn} onClick={() => handleDelete(tx._id)}>🗑️ Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const wrapperStyle = {
  padding: '10px'
};

const cardStyle = {
  background: '#fff',
  padding: '12px',
  marginBottom: '12px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  transition: 'all 0.3s ease-in-out'
};

const inputStyle = {
  padding: '6px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  margin: '4px'
};

const buttonGroup = {
  display: 'flex',
  gap: '8px',
  marginTop: '8px'
};

const editBtn = {
  background: '#ffc107',
  border: 'none',
  color: '#fff',
  padding: '6px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
};

const deleteBtn = {
  background: '#dc3545',
  border: 'none',
  color: '#fff',
  padding: '6px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
};

const updateBtn = {
  background: '#28a745',
  border: 'none',
  color: '#fff',
  padding: '6px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '8px'
};

const cancelBtn = {
  background: '#6c757d',
  border: 'none',
  color: '#fff',
  padding: '6px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '8px'
};

export default TransactionList;
