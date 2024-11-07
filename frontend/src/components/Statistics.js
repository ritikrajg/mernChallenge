import React from 'react';

const Statistics = ({ stats }) => {
  return (
    <div>
      <h3>Statistics</h3>
      <p>Total Sale Amount: ${stats.totalSaleAmount}</p>
      <p>Sold Items: {stats.soldItems}</p>
      <p>Unsold Items: {stats.unsoldItems}</p>
    </div>
  );
};

export default Statistics;
