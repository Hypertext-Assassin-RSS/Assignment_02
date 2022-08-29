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
        console.log('MySQL Connect')
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

module.exports = router