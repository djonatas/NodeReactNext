const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();


// app
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cookieParser());

// cors
app.use(cors());


app.get('/api', (req, res) => {
    res.json({time: Date().toString()});
})

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
