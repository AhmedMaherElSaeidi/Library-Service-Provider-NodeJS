const adminAuth = require("../middleware/admin.middleware");
const router = require('express').Router();
const { User, Book } = require("../models/index.model");
const bcrypt = require("bcrypt");
const { usernameVa1idation, emailVa1idation, passwordVa1idation, borrowCountVa1idation, phoneVa1idation } = require("../middleware/fields-validation.middleware")


// GET REQUEST => GET
router.get('/', async (req, res) => {
    const users = await User.findAll();

    res.statusCode = 201;
    res.json(users);
})

// GET REQUEST => GET[INDEX]
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { user_id: id } });

    if (user === null) {
        res.status(404);
        res.json({
            message: `No user with id ${id} was found.`,
        });
        return;
    }

    res.status(201);
    res.json(user);
})

// POST REQUEST => CREATE
router.post('/', adminAuth, usernameVa1idation, emailVa1idation, passwordVa1idation, borrowCountVa1idation, phoneVa1idation, async (req, res) => {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.statusCode = 400;
            res.json({ message: err.array() });
            return;
        }

        const _user = req.body;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(_user.password, salt);
        _user.password = hashedPassword;

        const user = await User.create(_user);
        res.status(201);
        res.json({ message: `User with id ${user.user_id} has been created.`, user });
    } catch (err) {
        res.status(400);
        res.json({ message: `there is a problem creating new user.\n${err}` });
    }
})

// PUT REQUEST => UPDATE
router.put('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { user_id: id } });

    if (user === null) {
        res.status(404);
        res.json({
            message: `No user with id ${id} was found.`,
        });
        return;
    }

    try {
        const _user = req.body;

        if (_user.password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(_user.password, salt);
            _user.password = hashedPassword;
        }

        await User.update(
            { ..._user },
            {
                where: {
                    user_id: id,
                },
            }
        );
        res.status(201);
        res.json({ message: `User with id ${id} has been updated.` });
    } catch (err) {
        res.status(400);
        res.json({ message: `there is a problem updating user of id ${id}.\n${err}` });
    }
})

// DELETE REQUEST => DELETE
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { user_id: id } });

    if (user === null) {
        res.status(404);
        res.json({
            message: `No user with id ${id} was found.`,
        });
        return;
    }

    await User.destroy({ where: { user_id: id, } });

    res.status(201);
    res.json({ message: `User with id ${id} has been removed.` });
})

// JOIN OPERATIONS
// GET BOOK TABLE JOINED WITH USER & BOOK TABLES RECORDS
router.get("/join/user-book", async (req, res) => {
    const join = await User.findAll({ include: Book, });

    res.status(201);
    res.json(join);
});

// GET bOOK TABLE JOINED WITH USER & BOOK TABLES SPECIFIC RECORD
router.get("/join/user-book/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({
        where: { user_id: id },
        include: Book,
    });

    if (user === null) {
        res.status(404);
        res.json({
            message: `No user record with id ${id} was found.`,
        });
        return;
    }

    res.status(201);
    res.json(user);
});

module.exports = router;