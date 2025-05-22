const db = require('../database');

class IdentityDocument {
    static create(userId, series, number, issueDate) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO identity_documents (userId, series, number, issueDate) VALUES (?, ?, ?, ?)`,
                [userId, series, number, issueDate],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }
}

module.exports = IdentityDocument;
