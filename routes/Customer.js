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

router.post('/',(req, res) => {
    console.log(req.body)
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const salary = req.body.salary

    let query = 'INSERT INTO Customer(id, name, address, salary) VALUES (?,?,?,?)'
    connection.query(query,[id,name,address,salary],function (err, result, fields) {
        if (err){
            res.send("Customer Save Fail :"+err)
        }else {
            res.send({message:'Customer '+req.body.id + ' Saved'})
        }
    })
})


router.put('/',(req, res) => {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const salary = req.body.salary

    let query = 'UPDATE Customer SET name=? , address= ? , salary= ? WHERE id = ?'
    connection.query(query,[name,address,salary,id],function (err, result, fields) {
        if (err){
            res.send('Update Failed :'+err)
        }else {
            res.send({message:'Customer '+req.body.id + ' Update Success',result:result.message})
        }
    })
})

router.delete('/',(req, res) =>{
    const id = req.query.id

    let query = "DELETE FROM Customer WHERE id = ?"
    connection.query(query,[id],function (err, result, fields) {
        if (err){
            res.send('Customer '+id+' Delete Failed :'+err)
        }else {
            res.send({message:'Customer '+req.query.id + ' Deleted!'})
        }
    })
})
module.exports = router