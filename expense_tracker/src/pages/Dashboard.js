import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import ExpenseChart from '../components/Chart';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({ category: '', startDate: '', endDate: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPage = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:3000/api/transactions/paged?page=${page}&limit=5`, {
        headers: { Authorization: token }
      });
      setTransactions(res.data.transactions);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch paginated data:', err.message);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page]);

  const addTransaction = tx => setTransactions([...transactions, tx]);
  const deleteTransaction = id => setTransactions(transactions.filter(t => t._id !== id));

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const filtered = transactions.filter(tx =>
    (!filter.category || tx.category === filter.category) &&
    (!filter.startDate || new Date(tx.date) >= new Date(filter.startDate)) &&
    (!filter.endDate || new Date(tx.date) <= new Date(filter.endDate))
  );

  return (
    <div style={containerStyle}>
      <Navbar />

      <div style={topBarStyle}>
        <h2 style={fadeIn}>📊 Dashboard</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ThemeToggle />
          <button onClick={logout} style={logoutButtonStyle}>🚪 Logout</button>
        </div>
      </div>

      <div style={summaryCard}>
        <span><strong style={{ color: '#28a745' }}>Income: pkr{totalIncome}</strong></span>
        <span><strong style={{ color: '#dc3545' }}>Expense: pkr{totalExpense}</strong></span>
        <span><strong style={{ color: '#007bff' }}>Balance: pkr{totalIncome - totalExpense}</strong></span>
      </div>

      <div style={filterBox}>
        <input type="text" placeholder="🔍 Filter by category" value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })} style={inputStyle} />
        <input type="date" value={filter.startDate} onChange={e => setFilter({ ...filter, startDate: e.target.value })} style={inputStyle} />
        <input type="date" value={filter.endDate} onChange={e => setFilter({ ...filter, endDate: e.target.value })} style={inputStyle} />
      </div>

      <div style={row}>
        <div style={{ flex: 1, minWidth: '320px' }}>
          <TransactionForm onAdd={addTransaction} />
        </div>
        <div style={{ flex: 2, minWidth: '400px' }}>
          <TransactionList
  transactions={filtered}
  onDelete={deleteTransaction}
  onEditSave={(updatedTx) => {
    setTransactions((prev) =>
      prev.map((t) => (t._id === updatedTx._id ? updatedTx : t))
    );
  }}
/>
        </div>
      </div>

      <ExpenseChart transactions={filtered} />

      <div style={pagination}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} style={buttonStyle}>⬅ Previous</button>
        <span>Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} style={buttonStyle}>Next ➡</button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  fontFamily: 'Segoe UI, sans-serif',
  background: '#f7fafc',
  minHeight: '100vh',
  padding: '24px',
  maxWidth: '1300px',
  margin: '0 auto'
};

const topBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const fadeIn = {
  animation: 'fadeIn 0.6s ease-in-out'
};

const summaryCard = {
  background: '#ffffff',
  padding: '1.5rem',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '1.5rem',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  fontSize: '18px'
};

const filterBox = {
  background: '#ffffff',
  padding: '1.2rem',
  marginTop: '1.5rem',
  borderRadius: '12px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
};

const row = {
  display: 'flex',
  gap: '2rem',
  marginTop: '2rem',
  flexWrap: 'wrap'
};

const pagination = {
  marginTop: '2.5rem',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  gap: '14px',
  alignItems: 'center'
};

const inputStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  flex: '1',
  minWidth: '180px',
  fontSize: '15px'
};

const buttonStyle = {
  padding: '10px 18px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '14px'
};

const logoutButtonStyle = {
  ...buttonStyle,
  background: '#dc3545'
};

export default Dashboard;