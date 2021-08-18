const express = require('express');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
app.use(compression());
cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

//Routes.
const userRoute = require('./Routes/User.js');
const productRoute = require('./Routes/Product');
const orderRoute = require('./Routes/Order');




//MiddleWares
app.use(express.json());
dotenv.config();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token,gzip, compress, br");
    res.header('Access-Control-Allow-Methods', "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

mongoose.connect(process.env.DB_CONNECT, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected…")
})
    .catch(err => console.log('Could not Connect to MongoDb !!!', err))

//Route Middlewares
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/order', orderRoute);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
