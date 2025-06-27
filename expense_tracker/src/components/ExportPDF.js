// 📁 client/src/components/ExportPDF.js
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
function ExportPDF({ transactions }) {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction Report', 20, 10);
    const tableColumn = ['Type', 'Category', 'Amount', 'Date', 'Description'];
    const tableRows = transactions.map(tx => [
      tx.type,
      tx.category,
      tx.amount,
      tx.date.split('T')[0],
      tx.description
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save('transactions.pdf');
  };
  return <button onClick={exportPDF}>Export to PDF</button>;
}
export default ExportPDF;