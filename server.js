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
    orgin:[`http://localhost:3000`],
    credntials: true, 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

//BodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Express Session - Authentication
app.use(session({
    store: new MongoStore({ url: process.env.MONGO_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, 
    }
}));

// ---------- Routes-------- //

app.get('/', (req,res)=>{
    res.send('<h1> RTCuts API </h1>');
});

app.use('/api/v1/auth', routes.auth);



app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`));