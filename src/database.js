const sqlite3 = require('sqlite3').verbose()
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require('fs');

const DB_SOURCE = path.resolve(__dirname, '../database/db.sqlite')

if (!fs.existsSync(DB_SOURCE)) {
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
            username text UNIQUE,
            email text UNIQUE, 
            password text, 
            role text,
            CONSTRAINT email_unique UNIQUE (email),
            CONSTRAINT username_unique UNIQUE (username),
            )`, (err) => {
            if (!err) {
                // Table just created, creating some rows
                const insert = 'INSERT INTO user (name, username, email, role, password) VALUES (?,?,?,?,?)'
                db.run(insert, ["Jane Doe", "admin", "admin@example.com", "ADMIN", bcrypt.hashSync("admin123456", 8)])
                db.run(insert, ["John Doe", "user", "user@example.com", "USER", bcrypt.hashSync("user123456", 8)])
                db.run(insert, ["Mary Moe", "recruiter", "recruiter@example.com", "RECRUITER", bcrypt.hashSync("recruiter123456", 8)])

            }
        });

    }
});

module.exports = db
