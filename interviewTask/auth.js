const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader)
    const token = authHeader.split(' ')[1];
    console.log("authHeader",authHeader,"token")
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, "mysecreatekey", (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403);
        next()
    })
}