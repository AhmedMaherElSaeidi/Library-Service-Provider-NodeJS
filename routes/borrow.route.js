const adminAuth = require("../middleware/admin.middleware");
const router = require('express').Router();
const { Borrow, User, Book } = require("../models/index.model");

// GET REQUEST => GET
router.get('/', async (req, res) => {
    const borrow = await Borrow.findAll();

    res.statusCode = 201;
    res.json(borrow);
})

// GET REQUEST => GET[INDEX]
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const borrow = await Borrow.findOne({ where: { borrow_id: id } });

    if (borrow === null) {
        res.status(404);
        res.json({
            message: `No borrow record with id ${id} was found.`,
        });
        return;
    }

    res.status(201);
    res.json(borrow);
})

// POST REQUEST => CREATE
router.post('/', adminAuth, async (req, res) => {
    const _borrow = req.body;
    try {
        const borrow = await Borrow.create(_borrow);
        res.status(201);
        res.json({ message: `Borrow record with id ${borrow.borrow_id} has been created.`, borrow });
    } catch (err) {
        res.status(400);
        res.send(`there is a problem creating new borrow record.\n${err}`);
    }
})

// PUT REQUEST => UPDATE
router.put('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const borrow = await Borrow.findOne({ where: { borrow_id: id } });

    if (borrow === null) {
        res.status(404);
        res.json({
            message: `No borrow record with id ${id} was found.`,
        });
        return;
    }

    try {
        const _borrow = req.body;
        await Borrow.update(
            { ..._borrow },
            {
                where: {
                    borrow_id: id,
                },
            }
        );
        res.status(201);
        res.json({ message: `borrow with id ${id} has been updated.` });
    } catch (err) {
        res.status(400);
        res.send(`there is a problem updating borrow of id ${id}.\n${err}`);
    }
})

// DELETE REQUEST => DELETE
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const borrow = await Borrow.findOne({ where: { borrow_id: id } });

    if (borrow === null) {
        res.status(404);
        res.json({
            message: `No borrow record with id ${id} was found.`,
        });
        return;
    }

    await borrow.destroy({ where: { borrow_id: id, } });

    res.status(201);
    res.json({ message: `Borrow record with id ${id} has been removed.` });
})

// JOIN OPERATIONS
// GET BORROW TABLE JOINED WITH USER & BOOK TABLES RECORDS
router.get("/join/user-book", async (req, res) => {
    const join = await Borrow.findAll({ include: [User, Book], });

    res.status(201);
    res.json(join);
});

// GET BORROW TABLE JOINED WITH USER & BOOK TABLES SPECIFIC RECORD
router.get("/join/user-book/:id", async (req, res) => {
    const { id } = req.params;
    const borrow = await Borrow.findOne({
        where: { borrow_id: id },
        include: [User, Book],
    });

    if (borrow === null) {
        res.status(404);
        res.json({
            message: `No borrow record with id ${id} was found.`,
        });
        return;
    }

    res.status(201);
    res.json(borrow);
});

module.exports = router;