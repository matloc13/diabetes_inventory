const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userRoutes = require('./controllers/userRoutes');
const deviceRoutes = require('./controllers/deviceRoutes');
const medicineRoutes = require('./controllers/medicineRoutes');

const port = process.env.PORT || 3000;
require('dotenv').config();
const cors = require('cors');
// const { expressCspHeader, NONCE } = require('express-csp-header');

// const cookieParser = require('cookie-parser');
// const csrf = require('csurf');
// const csrfProtection = csrf({ cookie: true });

// MONGO

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL;

mongoose.connection.once('open', () => {
    console.log('mongo - connected');
});

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// Middleware

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());
// app.use(cookieParser(process.env.SECRET));

// app.use(
//     expressCspHeader({
//         directives: {
//             'script-src': [NONCE],
//         },
//     })
// );


app.use(
    cors({
        origin: ['*','https://diabetes-supplies-portal.herokuapp.com', 'http://localhost:3001','0.0.0.0/0'],
        methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Accept', 'authorization'],
        credentials: true,
        preflightContinue: true,
    })
);

app.use('/user', userRoutes);
app.use('/device', deviceRoutes);
app.use('/medicine', medicineRoutes);

// app.get("/", csrfProtection, (req, res) => {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
// });

app.listen(port, () => console.log(`server listening on port: ${port} 🔥`));
