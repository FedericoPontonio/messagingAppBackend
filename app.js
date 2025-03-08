const express = require('express');
require('dotenv').config();
const indexRouter = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//allow CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

//alternative to allow all CORS
app.use(cors());



app.use('/', indexRouter);

app.listen(process.env.PORT || 3000)