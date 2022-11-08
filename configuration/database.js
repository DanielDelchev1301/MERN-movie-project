const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('./environment');

exports.initializeDataBase = () => mongoose.connect(CONNECTION_STRING);