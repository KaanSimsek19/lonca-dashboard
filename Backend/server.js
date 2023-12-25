const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })

const routes = require('./routes/routes');

const mongoURI = "mongodb+srv://user:user@cluster0.oa9sgm5.mongodb.net/?retryWrites=true&w=majority"

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/dashboard', routes);


mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
    })
    .then(() =>
        app.listen(8080, () => {
            console.log('Connected to the server!');
        })
    );