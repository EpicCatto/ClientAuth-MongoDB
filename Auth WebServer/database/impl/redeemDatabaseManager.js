const mongoose = require('mongoose');

const redeemDatabaseManager = new mongoose.Schema({
    createBy: String,
    code: String,
    createAt: String
});

module.exports = new mongoose.model('IntegerRedeem', redeemDatabaseManager, 'RedeemCodes');