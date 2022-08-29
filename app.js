const express = require('express')
const Customer = require('./routes/Customer')

const app = express();
const port = 4000;

app.use(express.json())

app.use('/customer',Customer)

app.listen(port,(req,res) => {
    console.log('App start and listening on port :'+port)
})
