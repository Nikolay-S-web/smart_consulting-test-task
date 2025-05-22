const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        db.serialize(() => {
            db.run(
                `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userFullName TEXT NOT NULL UNIQUE,
                userDateOfBirth TEXT NOT NULL,
                userPhone TEXT NOT NULL,
                hashedPassword TEXT NOT NULL,
                hashedAuthKey TEXT NOT NULL)`,
                (err) => {
                    if (err) {
                        console.error('Error creating users table: ' + err.message);
                    }
                }
            );

            db.run(
                `CREATE TABLE IF NOT EXISTS identity_documents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                series TEXT NOT NULL,
                number TEXT NOT NULL,
                issueDate TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id))`,
                (err) => {
                    if (err) {
                        console.error('Error creating identity_documents table: ' + err.message);
                    }
                }
            );

            db.run(
                `CREATE TABLE IF NOT EXISTS work_info (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                companyName TEXT NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id))`,
                (err) => {
                    if (err) {
                        console.error('Error creating work_info table: ' + err.message);
                    }
                }
            );
        });
    }
});

module.exports = db;
