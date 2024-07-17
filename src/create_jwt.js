const jwt = require("jsonwebtoken");

function create_jwt() {
    const payload = {"ma": "mama"}
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, {});
    return token
}

module.exports = {
    create_jwt
};
