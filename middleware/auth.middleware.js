const jwt = require("jsonwebtoken");

const loggedInAuth = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: [{msg: "Invalid token."}] });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        if (err)
            return res.status(401).json({ message: [{msg: `Invalid token.\n${err}`}] });

        req.user = payload;
        next();
    });
}

module.exports = loggedInAuth;