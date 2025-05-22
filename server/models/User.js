const db = require('../database');

class User {
    static create(userFullName, userDateOfBirth, userPhone, hashedPassword, hashedAuthKey) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users (userFullName, userDateOfBirth, userPhone, hashedPassword, hashedAuthKey) VALUES (?, ?, ?, ?, ?)`,
                [userFullName, userDateOfBirth, userPhone, hashedPassword, hashedAuthKey],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static async findByUserFullName(userFullName) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE userFullName = ?', [userFullName], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }
}

module.exports = User;
