// 📁 client/src/components/ExportCSV.js
import React from 'react';
import { CSVLink } from 'react-csv';
 function ExportCSV({ transactions }) {
  const headers = [
    { label: 'Type', key: 'type' },
    { label: 'Category', key: 'category' },
    { label: 'Amount', key: 'amount' },
    { label: 'Date', key: 'date' },
    { label: 'Description', key: 'description' },
  ];
  return (
    <CSVLink
      data={transactions}
      headers={headers}
      filename={'transactions.csv'}
      className="btn btn-outline-primary"
    >
      Export to CSV
    </CSVLink>
  );
}
export default ExportCSV;