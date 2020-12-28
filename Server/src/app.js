const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'MONGODB_URL'

const app = express();

mongoose.connect(url , {useNewUrlParser:true , useUnifiedTopology:true});

const PORT = 3001;

const con  = mongoose.connection;

con.on('open' , () => {
    console.log('Connected with mongoose databse....');
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mentorRouter = require('./Routers/mentor_router');
app.use('/Mentor',mentorRouter);

const userRouter = require('./Routers/user_router');
app.use('/User',userRouter);

app.listen(PORT, () => console.log(`Hello world app listening on port ${PORT}!`))