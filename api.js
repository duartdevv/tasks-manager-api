// const requires
const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const mysqlConfigs = require("./inc/mysql_config")
const functions = require("./inc/functions")

// api info
const API_AVAILABLE = true
const API_VERSION = "1.0.0"
const app = express()
//cors
app.use(cors())
app.use(express.json())
//init server
app.listen(3000, () => {
    console.log("API is running.")
})
// api availabe
app.use((req, res, next) => {
    if (API_AVAILABLE === true) {
        next()
    } else {
        res.status(503).json(functions.response("Warning", "Error - API is in maintenance. Sorry!", "0", null,))
    }
})
const connection = mysql.createConnection(mysqlConfigs.dataBase)

//routes -----------------------------------------
app.get("/", (req, res) => {
    res.json(functions.response("Success", "API is running", 0, null))
})
// endpoints
// ----------------
// GET all tasks
app.get("/tasks", (req, res) =>{
    connection.query("SELECT * FROM tasks", (err, rows,) =>{
        if(!err) {
            res.json(functions.response("success", "success", rows.length, rows))
        } else {
            res.status(500).json(functions.response("error", err.message, 0, null))
        }
    })
})
// GET task by id
app.get("/tasks/:id", (req, res) =>{
    const id = req.params.id
    connection.query("SELECT * FROM tasks WHERE id = ?", [id],(err, rows) =>{
        if (!err) {

            if (rows.length > 0) {
                res.json(functions.response("success", "success", rows.length, rows ))
            } else {
                res.status(404).json(functions.response("Warning", "task not found", 0, null))
            }
        } else {
            res.status(500).json(functions.response("Error", err.message, 0, null))
        }
    })
})

app.use((req, res) => {
    res.status(404).json(functions.response("Error", "Route not found", 0, null))
})
