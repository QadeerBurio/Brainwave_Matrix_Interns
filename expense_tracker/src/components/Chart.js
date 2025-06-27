import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Chart({ transactions }) {
  // 🧠 Extract unique categories from expenses
  const categories = [...new Set(transactions.map(t => t.category))];
  const expenseData = categories.map(cat =>
    transactions
      .filter(t => t.category === cat && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const hasData = expenseData.some(val => val > 0);

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: expenseData,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#00b894',
          '#fd79a8',
          '#6c5ce7',
          '#fab1a0'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        borderColor: '#fff',
        borderWidth: 1
      },
      title: {
        display: true,
        text: '📊 Expense Distribution by Category',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: '#333',
        padding: {
          top: 10,
          bottom: 30
        }
      }
    }
  };

  return (
    <div style={containerStyle}>
      {hasData ? (
        <Pie data={data} options={options} />
      ) : (
        <p style={{ color: '#666', textAlign: 'center', marginTop: '2rem' }}>
          No expense data to display chart.
        </p>
      )}
    </div>
  );
}

// 🎨 Container styling for shadow and smooth visuals
const containerStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  marginTop: '2rem',
  maxWidth: '700px',
  marginLeft: 'auto',
  marginRight: 'auto',
  transition: 'all 0.3s ease-in-out'
};

export default Chart;
