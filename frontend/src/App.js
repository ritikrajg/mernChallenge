import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from './components/Dropdown';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import PriceRangeChart from './components/PriceRangeChart';
import CategoryPieChart from './components/CategoryPieChart';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [priceRangeData, setPriceRangeData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (selectedMonth) {
      axios.get(`/api/transactions?month=${selectedMonth}`).then((response) => setTransactions(response.data));
      axios.get(`/api/statistics?month=${selectedMonth}`).then((response) => setStatistics(response.data));
      axios.get(`/api/price-range?month=${selectedMonth}`).then((response) => setPriceRangeData(response.data));
      axios.get(`/api/categories?month=${selectedMonth}`).then((response) => setCategoryData(response.data));
    }
  }, [selectedMonth]);

  return (
    <div>
      <h1>MERN Stack Challenge</h1>
      <Dropdown
        months={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
        selectedMonth={selectedMonth}
        onChange={setSelectedMonth}
      />
      <Statistics stats={statistics} />
      <TransactionTable transactions={transactions} />
      <PriceRangeChart data={priceRangeData} />
      <CategoryPieChart data={categoryData} />
    </div>
  );
};

export default App;
