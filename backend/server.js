const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const betsRouter = require('./routes/bets');
const usersRouter = require('./routes/users');
const bookiesRouter = require('./routes/bookies');
const walletsRouter = require('./routes/wallets');
const exchangesRouter = require("./routes/exchanges")
const teamRouter = require('./routes/teams')

app.use('/bets', betsRouter);
app.use('/users', usersRouter);
app.use('/bookies', bookiesRouter);
app.use('/wallets', walletsRouter);
app.use('/exchanges', exchangesRouter);
app.use('/teams', teamRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); 