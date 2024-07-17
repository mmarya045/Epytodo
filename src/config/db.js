const mysql = require("mysql2");
require('dotenv').config();


const db = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        password: process.env.MYSQL_ROOT_PASSWORD,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE
    });

db.connect(function(err) {
    if (err) {
        console.log("Error connecting to the database:\n", err);
    } else {
        console.log("Connected to the database");
    }
});

module.exports = {
    db
};
