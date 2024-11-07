const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/transactions', async (req, res) => {
  const { search = '', page = 1, perPage = 10, month } = req.query;
  const regex = new RegExp(search, 'i');
  const matchConditions = {
    $or: [{ productTitle: regex }, { productDescription: regex }, { price: regex }],
  };
  if (month) {
    matchConditions.dateOfSale = { $regex: `-${month}-` };  // Match month in date format
  }

  const transactions = await Transaction.find(matchConditions)
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));
  res.json(transactions);
});

router.get('/statistics', async (req, res) => {
    const { month } = req.query;
    const matchMonth = { dateOfSale: { $regex: `-${month}-` } };
    const transactions = await Transaction.find(matchMonth);
  
    const totalSaleAmount = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
    const soldItems = transactions.filter(transaction => transaction.isSold).length;
    const unsoldItems = transactions.length - soldItems;
  
    res.json({ totalSaleAmount, soldItems, unsoldItems });
});
 
router.get('/price-range', async (req, res) => {
    const { month } = req.query;
    const priceRanges = [
      { range: '0-100', min: 0, max: 100 },
      { range: '101-200', min: 101, max: 200 },
      { range: '201-300', min: 201, max: 300 },
      { range: '301-400', min: 301, max: 400 },
      { range: '401-500', min: 401, max: 500 },
      { range: '501-600', min: 501, max: 600 },
      { range: '601-700', min: 601, max: 700 },
      { range: '701-800', min: 701, max: 800 },
      { range: '801-900', min: 801, max: 900 },
      { range: '901+', min: 901, max: Infinity },
    ];
  
    const results = await Promise.all(
      priceRanges.map(async range => {
        const count = await Transaction.countDocuments({
          dateOfSale: { $regex: `-${month}-` },
          price: { $gte: range.min, $lte: range.max },
        });
        return { range: range.range, count };
      })
    );
  
    res.json(results);
  });
 
  router.get('/categories', async (req, res) => {
    const { month } = req.query;
    const categories = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: `-${month}-` } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    res.json(categories);
  });
  
  router.get('/combined-data', async (req, res) => {
    const [transactions, statistics, priceRange, categories] = await Promise.all([
      Transaction.find({ dateOfSale: { $regex: `-${req.query.month}-` } }),
      Transaction.find({ dateOfSale: { $regex: `-${req.query.month}-` } }),
      Transaction.find({ dateOfSale: { $regex: `-${req.query.month}-` } }),
      Transaction.find({ dateOfSale: { $regex: `-${req.query.month}-` } }),
    ]);
  
    res.json({ transactions, statistics, priceRange, categories });
  });
  
module.exports = router;
