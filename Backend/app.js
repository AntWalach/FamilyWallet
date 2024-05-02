const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');
const cookieParser = require('cookie-parser');
const errorHandler = require('./helpers/errorHandler');
const app = express();


require('dotenv').config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser())
app.use(errorHandler)

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port: ', PORT);
    })
}

server();