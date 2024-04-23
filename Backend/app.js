const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');
const cookieParser = require('cookie-parser');
const fs = require("node:fs")
const app = express();


require('dotenv').config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
    //origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port: ', PORT);
    })
}

server();