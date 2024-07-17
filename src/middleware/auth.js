const jwt = require("jsonwebtoken");

function verify_header_autoriz(req, res, next) {
    const bearer_token = req['headers']['authorization'];
    if (bearer_token === "" || bearer_token == undefined) {
        res.status(401).send({"msg": "No token, authorization denied"})
        return
    }
    const bearer = bearer_token.split(" ");
    const token = bearer[1];
    if (bearer === "" || bearer == undefined) {
        res.status(401).send({"msg": "No token, authorization denied"})
        return
    }
    jwt.verify(token, process.env.SECRET, function(err, payload) {
        if (err || payload == undefined) {
            res.status(401).send({"msg": "Token is not valid"});
        } else {
            next();
        }
    });
}

module.exports = {
    verify_header_autoriz
};
