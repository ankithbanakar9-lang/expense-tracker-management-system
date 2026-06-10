const path = require('path');
require('dotenv').config();
console.log("ENV TEST:", process.env.MONGO_URL);
const express = require('express');
const cors = require('cors');
const app = express();

console.log("MONGO_URL =", process.env.MONGO_URL);
const { db } = require('./db/db');
const{readdirSync} = require('fs');

const PORT=process.env.PORT

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));


app.get('/', (req, res) => {
    res.send('Hello World')
})

const server=()=>{
    db()
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`);
    })
}

server()