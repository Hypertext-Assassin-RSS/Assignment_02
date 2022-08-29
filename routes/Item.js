const express =require('express')
const {json} = require('express')
const  router = express.Router()
const db = require('../config/config.db')

const app = express();
const mysql = require('mysql')
const e = require("express");

app.use(express.json())

const connection = mysql.createConnection(db.database);
connection.connect(function (error) {
    if (error){
        console.log("Connection fail :"+error)
    }else {
        console.log('MySQL Connect')
        let query = 'CREATE TABLE IF NOT EXISTS Item(id VARCHAR(255) PRIMARY KEY,name VARCHAR(255), qty int, price double)'
        connection.query(query,function (err,result){
            if (err){
                console.log(err)
            }else if (result.warningCount == 0){
                console.log('Item Table Create')
            }
        })
    }
})

router.post('/',(req, res) => {
    console.log(req.body)

    const  id = req.body.id
    const  name = req.body.name
    const qty = req.body.qty
    const  price = req.body.price

    let query = 'INSERT INTO Item(id,name,qty,price) VALUES (?,?,?,?)'
    connection.query(query,[id,name,qty,price],function (err,resul) {
        if (err){
            res.send('Error :'+err)
        }else {
            res.send('Item '+id+' is Saved')
        }
    })
})

router.get('/',(req, res) => {
    let query = 'SELECT * FROM item'
    connection.query(query,function (err,result) {
        if (err){
            res.send('Load Data Fail Error :'+err)
        }else {
            res.send({message:'Load Data Success',result:result})
        }
    })
})
module.exports = router