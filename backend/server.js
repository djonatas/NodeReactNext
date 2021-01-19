const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log('DB Connected');
})


// app
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: `${process.env.CLIENT_URL}`
    }));
} else {
    app.use(cors());
}

app.use('/api',blogRoutes);
app.use('/api',authRoutes);

// ports
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
