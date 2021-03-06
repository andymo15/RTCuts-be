const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes');

// ----------- Middleware ------- //

// CORS

const corsOptions={
    origin:['https://rtcuts.herokuapp.com'],
    credentials: true, 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

//BodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Express Session - Authentication
app.use(session({
    store: new MongoStore({ url: process.env.MONGODB_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, 
    }
}));

// ---------- Routes-------- //

app.get('/', (req,res)=>{
    res.send('<h1> RTCuts API </h1>');
});

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/appts', routes.appointment);
app.use('/api/v1/user', routes.user);



// app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`));

app.listen(process.env.PORT || 4000);