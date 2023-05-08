const router = require('express').Router();
const { User } = require("../models/index.model");

// JWT TOKEN
const jwt = require("jsonwebtoken");

// HASHING
const bcrypt = require("bcrypt");

// VALIDATION
const { validationResult } = require('express-validator');
const { usernameVa1idation, emailVa1idation, passwordVa1idation, phoneVa1idation, genderRefVa1idation } = require("../middleware/fields-validation.middleware")

// GENERATE ACCESS TOKEN
const generateAccessToken = (userData) => {
    return jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '3600s' })
}

// REGISTER
router.post("/register", usernameVa1idation, emailVa1idation,genderRefVa1idation, passwordVa1idation, phoneVa1idation, async (req, res) => {
    try {
        // CHECK VALIDATION RESULT
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.statusCode = 400;
            res.json({ message: err.array() });
            return;
        }

        // VALIDATE EMAIL
        const _user = req.body;
        const user = await User.findOne({
            where: { email: _user.email },
        })

        if (user) {
            res.statusCode = 400;
            res.json({ message: "Email already exists." });
            return;
        }

        // HASHING
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(_user.password, salt);
        _user.password = hashedPassword;

        // REGISTERING
        await User.create(_user);
        res.statusCode = 201;
        res.json({ message: "Registered successfully." });
    } catch (error) {
        res.statusCode = 400;
        res.json({message: error});
    }
})

// LOGIN
router.post("/login", emailVa1idation, passwordVa1idation, async (req, res) => {
    try {
        // CHECK VALIDATION RESULT
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.statusCode = 400;
            res.json({ message: err.array() });
            return;
        }

        // VALIDATE EMAIL
        const _user = req.body;
        const user = await User.findOne({
            where: { email: _user.email },
        })

        if (!user) {
            res.statusCode = 400;
            res.json({ message: "Email doesn't exist." });
            return;
        }

        // VALIDATE PASSWORD
        if (!(await bcrypt.compare(_user.password, user.password))) {
            res.statusCode = 400;
            res.json({ message: "Password isn't correct." });
            return;
        }

        // VALIDATE ACCOUNT 
        if (user.status === 'inactive') {
            res.statusCode = 400;
            res.json({ message: "Account isn't activated yet." });
            return;
        }

        // LOGGING IN
        const token = generateAccessToken({
            userID: user.user_id,
            username: user.username,
            email: user.email,
            status: user.status,
            type: user.type,
            borrowCount: user.borrowCount,
            phone: user.phone
        })

        res.statusCode = 201;
        res.json({ token })
    } catch (error) {
        res.statusCode = 400;
        res.json({message: error});
    }

})

module.exports = router;