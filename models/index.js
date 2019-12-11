const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.MONGO_URI;

mongoose.connect(process.env.MONGODB_URI, {
useNewUrlParser: true,
useFindAndModify: false,
useCreateIndex: true,
useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected RTCuts...'))
.catch((err) => console.log(`MongoDB connection error": ${err}`));


module.exports ={
    User: require('./User'),
    Appointments: require('./Appointments'),
};