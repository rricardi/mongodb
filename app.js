const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const product = require('./routes/product.route');
const env = require('./environments/production');
const mongoose = require('mongoose');

//connection db variables
const port = env.port;
const mongo_db_prefix = env.mongodb;
const user = env.user;
const password = env.password;
const host = env.host;
const database = env.database;

let dev_db_url = mongo_db_prefix + user + ':' + password + '@' + host + ':' + port + '/' + database;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
console.log(mongoDB);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extentend: false}));
app.use('/products', product);


app.listen(port, () => {
    console.log('Server running in port: ' + port);
});