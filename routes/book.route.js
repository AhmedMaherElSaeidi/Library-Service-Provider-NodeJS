const adminAuth = require("../middleware/admin.middleware");
const router = require('express').Router();
const { Book, Category } = require("../models/index.model");
const { validationResult } = require('express-validator');
const { categoryRefVa1idation, userRefVa1idation } = require("../middleware/fields-validation.middleware");

// GET REQUEST => GET
router.get('/', async (req, res) => {
    const book = await Book.findAll();

    res.statusCode = 201;
    res.json(book);
})

// GET REQUEST => GET[INDEX]
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findOne({ where: { book_id: id } });

    if (book === null) {
        res.status(404);
        res.json({
            message: `No book with id ${id} was found.`,
        });
        return;
    }

    res.status(201);
    res.json(book);
})

// POST REQUEST => CREATE
router.post('/', adminAuth, categoryRefVa1idation, userRefVa1idation, async (req, res) => {
    const _book = req.body;
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.statusCode = 400;
            res.json({ message: err.array() });
            return;
        }

        const book = await Book.create(_book);
        res.status(201);
        res.json({ message: `Book with id ${book.book_id} has been created.`, book });
    } catch (err) {
        res.status(400);
        res.json({ message: `there is a problem creating new book.\n${err}` });
    }
})

// PUT REQUEST => UPDATE
router.put('/:id', adminAuth, categoryRefVa1idation, userRefVa1idation, async (req, res) => {    
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.statusCode = 400;
        res.json({ message: err.array() });
        return;
    }
    
    const { id } = req.params;
    const book = await Book.findOne({ where: { book_id: id } });

    if (book === null) {
        res.status(404);
        res.json({
            message: `No book with id ${id} was found.`,
        });
        return;
    }

    try {
        const _book = req.body;
        await Book.update(
            { ..._book },
            {
                where: {
                    book_id: id,
                },
            }
        );
        res.status(201);
        res.json({ message: `Book with id ${id} has been updated.` });
    } catch (err) {
        res.status(400);
        res.json({ message: `there is a problem updating book of id ${id}.\n${err}` });
    }
})

// DELETE REQUEST => DELETE
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const book = await Book.findOne({ where: { book_id: id } });

    if (book === null) {
        res.status(404);
        res.json({
            message: `No book with id ${id} was found.`,
        });
        return;
    }

    await Book.destroy({ where: { book_id: id, } });

    res.status(201);
    res.json({ message: `Book with id ${id} has been removed.` });
})

// JOIN OPERATIONS
router.get("/join/book-category", async (req, res) => {
    const join = await Book.findAll({ include: { model: Category, attributes: ["category_id", "category"] } });

    res.status(201);
    res.json(join);
});

// GET bOOK TABLE JOINED WITH USER & BOOK TABLES SPECIFIC RECORD
router.get("/join/book-category/:id", async (req, res) => {
    const { id } = req.params;
    const book = await Book.findOne({
        book: { book_id: id },
        include: { model: Category, attributes: ["category_id", "category"] },
    });

    if (book === null) {
        res.status(404);
        res.json({
            message: `No book record with id ${id} was found.`,
        });
        return;
    }

    res.status(201);
    res.json(book);
});
module.exports = router;