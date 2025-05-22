const db = require('../database');

class WorkInfo {
    static create(userId, companyName, phone, address) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO work_info (userId, companyName, phone, address) VALUES (?, ?, ?, ?)`,
                [userId, companyName, phone, address],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }
}

module.exports = WorkInfo;
