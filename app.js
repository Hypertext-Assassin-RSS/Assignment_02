const express = require('express')
const Customer = require('./routes/Customer')
const Item = require('./routes/Item')

const app = express();
const port = 4000;

app.use(express.json())

app.use('/customer',Customer)
app.use('/item',Item)

app.listen(port,(req,res) => {
    console.log('App start and listening on port :'+port)
})
