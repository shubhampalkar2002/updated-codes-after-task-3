// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/analytics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;

const db = require('./db');
const ChartData = require('./ChartData');

db.once('open', async () => {
  try {
    const initialData = {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      values: [10, 20, 30],
    };

    await ChartData.create(initialData);
    console.log('Initial chart data inserted into MongoDB');
  } catch (error) {
    console.error('Error inserting initial chart data:', error);
  } finally {
    db.close();
  }
});
