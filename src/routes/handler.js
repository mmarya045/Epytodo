const jwt = require("jsonwebtoken");
const con = require('../config/db');
const bcrypt = require('bcryptjs');

function register(req, res) {
    const body = req.body

    if (body['email'] === "" || body['name'] === "" || body['firstname'] === ""
        || body['password'] === "") {
        res.status(400).send({"msg": "Bad parameter"});
        return
    }
    const password = bcrypt.hashSync(body['password'], 8);
    const sql = `INSERT INTO user (email, password, name, firstname) VALUES ('${body['email']}', '${password}', '${body['name']}', '${body['firstname']}')`
    con.db.query(sql, function (err, result) {
        if (err) {
            console.error("error:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(409).send({msg: "Account already exists"});
                return
            }
            res.status(500).send({"msg": "Internal server error"});
            return
        }
        const user = result;
        var token = jwt.sign({ id: user.id}, process.env.SECRET);
        res.status(201).send({"token": token});
    })
}

function login(req, res) {
    const body = req.body

    if (body['email'] === "" || body['password'] === "") {
        res.status(400).send({"msg": "Bad parameter"});
        return
    }

    con.db.query(`SELECT id, password FROM user WHERE email = ?`, body['email'], async (err, results) => {
        if (err) {
            res.status(500).send({"msg": "Internal server error"});
            return
        }
        if (results.length === 0) {
            res.status(401).send({msg: "Invalid Credentials"})
            return
        }
        const ok = await bcrypt.compare(body['password'], results[0]['password']);
        if (!ok) {
            res.status(401).send({msg: "Invalid Credentials"})
        } else {
            var token = jwt.sign({ id: results[0]['id']}, process.env.SECRET);
            res.status(201).send({"token": token});
        }
    });
}

function get_user(req, res) {
    con.db.query(`SELECT * FROM user`, function (err, result) {
        if (err) {
            res.status(500).send({"msg": "Internal server error"});
        }
        res.status(200).json(result);
    });
}

function get_users_todos(req, res) {
    res.send({"marya": "coucou"});
}

function get_users_email(req, res) {
    res.send({"marya": "coucou"});
}

function get_users_id(req, res) {
    res.send({"marya": "coucou"});
}

function update_users_id(req, res) {
    res.send({"marya": "coucou"});
}

function delete_users_id(req, res) {
    res.send({"marya": "coucou"});
}

function get_todos(req, res) {
    con.db.query(`SELECT * FROM todo`, function (err, result) {
        if (err) {
            res.status(500).send({"msg": "Internal server error"});
        }
        res.status(200).json(result);
    });
}

function get_todos_id(req, res) {
    res.send({"marya": "coucou"});
}

function post_todos(req, res) {
    const body = req.body

    if (body['title'] === "" || body['description'] === "" || body['due_time'] === ""
    || body['user_id'] === "" || body['status'] === "") {
        res.status(400).send({"msg": "Bad parameter"});
        return
    }
    if (body['title'] == undefined || body['description'] == undefined || body['due_time'] == undefined
    || body['user_id'] == undefined || body['status'] == undefined) {
        res.status(400).send({"msg": "Bad parameter"});
        return
    }
    const sql = `INSERT INTO todo (title, description, due_time, user_id, status) VALUES ('${body['title']}', '${body['description']}', '${body['due_time']}', '${body['user_id']}', '${body['status']}')`
    con.db.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send({"msg": "Internal server error"});
            return
        }
        var id = result.insertId
        con.db.query('SELECT * FROM todo WHERE id = ?', [id], function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        })
    });
}

function update_todos_id(req, res) {
    res.send({"marya": "coucou"});
}

function delete_todos_id(req, res) {
    res.send({"marya": "coucou"});
}

module.exports = {
    register,
    login,
    get_user,
    get_users_todos,
    get_users_email,
    get_users_id,
    update_users_id,
    delete_users_id,
    get_todos,
    get_todos_id,
    post_todos,
    update_todos_id,
    delete_todos_id
};