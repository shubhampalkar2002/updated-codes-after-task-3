// ChartData.js
const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
  labels: [String],
  values: [Number],
  accessLogs: [
    {
      accessTime: { type: Date, default: Date.now },
      employeeName: String,
      filter: String,
    },
  ],
});

const ChartData = mongoose.model('ChartData', chartDataSchema);

module.exports = ChartData;
