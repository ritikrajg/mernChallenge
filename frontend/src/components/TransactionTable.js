import React from 'react';

const TransactionTable = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Product Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Date of Sale</th>
          <th>Category</th>
          <th>Sold</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction._id}>
            <td>{transaction.productTitle}</td>
            <td>{transaction.productDescription}</td>
            <td>{transaction.price}</td>
            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            <td>{transaction.category}</td>
            <td>{transaction.isSold ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
