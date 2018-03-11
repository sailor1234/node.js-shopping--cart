
var express = require('express');
var path = require('path');
 var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');



app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myshop');
mongoose.Promise = global.Promise;

// handling cors errors 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type,Accept,Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

 

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/categories');
const userRoutes = require("./routes/user");

// //routes
app.use('/uploads',express.static(--__dirname + '/assets'));
app.use('/products', productRoutes);
app.use('/orders', orderRoutes );
app.use('/categories', categoryRoutes);
app.use("/user", userRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
           message: error.message
        }
    });

});

// app.use((req, res, next)=>{
//          res.status(200).json({
//              message: 'it works'
//          });
//      });


module.exports = app;

