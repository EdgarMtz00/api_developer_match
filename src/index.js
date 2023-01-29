// Create eiMPROVExpress app
const express = require("express");
const db = require("./database");
const app = express();

// Server port
const HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/users", (req, res, next) => {
    const sql = "select * from user"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});
