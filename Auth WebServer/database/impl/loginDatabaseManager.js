const mongoose = require('mongoose');

const loginDatabaseManager = new mongoose.Schema({
    Username: String,
    UID: String,
    HWID: String,
    DiscordID: String
});

module.exports = new mongoose.model('IntegerUser', loginDatabaseManager, 'IntegerUser');