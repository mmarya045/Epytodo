const con = require('../../config/db');

async function insert_new_user(body) {
    const db = await con.db;
    const sql = `INSERT INTO user (email, password, name, firstname) VALUES ('${body['email']}', '${body['password']}', '${body['name']}', '${body['firstname']}')`
    const rows = db.query(sql)

    return rows
}

module.exports = {
    check_account_exist,
    insert_new_user
}