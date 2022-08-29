const  express = require('express')
const {json} = require('express')
const  router = express.Router()
const db = require('../config/config.db')

const app = express();
const mysql = require('mysql')

app.use(express.json())

const connection = mysql.createConnection(db.database);
connection.connect(function (error) {
    if (error){
        console.log("Connection fail :"+error)
    }else {
        let query = 'CREATE TABLE IF NOT EXISTS `Order`(orderId VARCHAR(255) PRIMARY KEY , customerId VARCHAR(255) ,total double ,qty int)'
        connection.query(query,function (err,result){
            if (err){
                console.log(err)
            }else if (result.warningCount == 0){
                console.log('Order Table Create')
            }
        })
    }
})

router.post('/',(req, res) => {

    console.log(req.body)

    const orderId = req.body.orderId
    const customerId = req.body.customerId
    const total = req.body.total
    const qty = req.body.qty

    let query = 'INSERT INTO `Order`(orderId, customerId, total, qty) VALUES (?,?,?,?)'
    connection.query(query,[orderId,customerId,total,qty],function (err,result) {
        if (err){
            res.send('Error :'+err)
        }else {
            res.send('Order '+orderId+' placed')
        }
    })
})

router.get('/' ,(req, res) => {
    let query = 'SELECT * FROM `Order`'
    connection.query(query,function (err,result) {
        if (err){
            res.send('Error :'+err)
        }else {
            res.send({message:'Get All Order Success',result:result,})
        }
    })
})

module.exports = router