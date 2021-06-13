const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeOutMS: 10000,
            family: 4
        };

        mongoose.connect('mongodb://localhost:27017/IntegerClient');
        mongoose
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Conected to the database.');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected to the database.');
        });

        mongoose.connection.on('err', (err) => {
            console.log('DATABASE ERROR: ' + err);
        });

    }
};