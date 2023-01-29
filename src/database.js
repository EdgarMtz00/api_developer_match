const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')
const path = require("path");
const fs = require('fs');

const DB_SOURCE = path.resolve(__dirname, '../database/db.sqlite')

if (!fs.existsSync(DB_SOURCE)){
    fs.closeSync(fs.openSync(DB_SOURCE, 'w'))
}

let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
                if (!err){
                    // Table just created, creating some rows
                    const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                    db.run(insert, ["admin", "admin@example.com", md5("admin123456")])
                    db.run(insert, ["user", "user@example.com", md5("user123456")])
                }
            });
    }
});


module.exports = db
