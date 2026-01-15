//requires
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
app.use(express.urlencoded({ extended: true }))
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
app.get("/tasks", (req, res) => {
    connection.query("SELECT * FROM tasks", (err, rows,) => {
        if (!err) {
            return res.json(functions.response("success", "success", rows.length, rows))
        } else {
            return res.status(500).json(functions.response("error", err.message, 0, null))
        }
    })
})
// GET task by id
app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
        return res.status(400).json(
            functions.response(
                "error",
                "ID must be a number",
                0,
                null
            )
        )
    }
    connection.query("SELECT * FROM tasks WHERE id = ?", [id], (err, rows) => {
        if (!err) {

            if (rows.length > 0) {
                return res.json(functions.response("success", "success", rows.length, rows))
            } else {
                return res.status(404).json(functions.response("Warning", "task not found", 0, null))
            }
        } else {
            res.status(500).json(functions.response("Error", err.message, 0, null))
        }
    })
})
// Update task
app.put("/tasks/:id/status/:status", (req, res) => {
    const id = req.params.id
    const status = req.params.status
    connection.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id], (err, result) => {
        if (!err) {
            if (result.affectedRows > 0) {
                return res.status(200).json(functions.response("success", "success", result.affectedRows, result))
            } else {
                return res.status(404).json(functions.response("Error 404", "Task not found", 0, null))
            }
        } else {
            res.status(500).json(functions.response("Warning", err.message, 0, null))
        }
    })
})
// delete task
app.delete("/tasks/delete/:id", (req, res) => {
    const id = req.params.id
    connection.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
        if (!err) {
            if (result.affectedRows > 0) {
                return res
                    .status(200)
                    .json(
                        functions.response(
                            "success",
                            "task deleted",
                            result.affectedRows,
                            null))
            } else {
                res.status(404).json(functions.response("Error", "Task not found", 0, null))
            }
        } else {
            res.status(500).json(functions.response("Warning", err.message, 0, null))
        }
    })
})
// Create task
app.post("/tasks/create", (req, res) => {
    const postData = req.body
    const task = postData.task
    const status = postData.status
    // check if the data is empty
    if (task.trim() === "") {
        return res.status(400).json(functions.response("Error", "Empty data", 0, null))
    } // chet if data is invalid
    if (task.trim() === "" || status.trim() === "") {
        return res.status(400).json(functions.response("Error", "Invalid data", 0, null))
    }

    // connection
    connection.query("INSERT INTO tasks (task, status, created_at, updated_at) VALUES (?, ?, NOW(), NOW())", [task, status], (err, result) => {
        if (!err) {
            return res.status(201).json(functions.response("success", "task created", result.affectedRows, null))
        } else {
            return res.status(500).json(functions.response("Error", err.message, 0, null))
        }
    })
})
app.use((req, res) => {
    return res.status(404).json(functions.response("Error", "Route not found", 0, null))
})
