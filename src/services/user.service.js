const bcrypt = require("bcryptjs");
const db = require("../database");
const {rowsHandler, successHandler} = require("./services");

module.exports = {
    findAll: async () => {
        return new Promise((resolve, reject) => {
            const query = "select id, name, username, email, role from user";
            db.all(query, [], rowsHandler(resolve, reject));
        });
    },
    findById: async (user_id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT id, name, username, email, role FROM user WHERE id = ?`;
            return db.get(query, [user_id], rowsHandler(resolve, reject));
        });
    },
    findUsername: async (username) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT id, name, username, email, role FROM user WHERE username = ?`;
            return db.get(query, [username], rowsHandler(resolve, reject));
        });
    },
    findAuthUserByEmail: async (email) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM user WHERE email = ?`;
            return db.get(query, [email], rowsHandler(resolve, reject));
        });
    },
    create: async (user) => {
        return new Promise((resolve, reject) => {
            const insert = 'INSERT INTO user (username, name, email, role, password) VALUES (?,?,?,?,?)';
            const params = [user.username, user.name, user.email, user.role, bcrypt.hashSync(user.password, 8)]
            return db.run(insert, params, successHandler(resolve, reject));
        })
    },
    delete: async (user_id) => {
        return new Promise((resolve, reject) => {
            const statement = 'DELETE FROM user WHERE id = ?';
            return db.run(statement, [user_id], successHandler(resolve, reject));
        });

    }
}

