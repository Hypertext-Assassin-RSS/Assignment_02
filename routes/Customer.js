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
        let query = 'CREATE TABLE IF NOT EXISTS Customer(id VARCHAR(255) PRIMARY KEY,name VARCHAR(255), address VARCHAR(255), salary double)'
        connection.query(query,function (err,result){
            if (err){
                console.log(err)
            }else if (result.warningCount == 0){
                console.log('Customer Table Create')
            }
        })
    }
})

router.get('/',(req, res) => {
    let query = 'SELECT * FROM customer'
    connection.query(query,function (err, result, fields) {
        if (err){
            res.send('Data Load Failed :'+err)
        }else {
            res.send({message:'Get All Success',result:result})
        }
    })
})

module.exports = router