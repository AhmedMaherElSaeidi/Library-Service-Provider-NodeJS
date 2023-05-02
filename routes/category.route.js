const adminAuth = require("../middleware/admin.middleware");
const router = require('express').Router();
const { Category, Book } = require("../models/index.model");


// GET REQUEST => GET
router.get('/', async (req, res) => {
    const category = await Category.findAll({attributes: ["category_id", "category"]});

    res.statusCode = 201;
    res.json(category);
})

// GET REQUEST => GET[INDEX]
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOne({ attributes: ["category_id", "category"], where: { category_id: id } });

    if (category === null) {
        res.status(404);
        res.json({
            message: `No category with id ${id} was found.`,
        });
        return;
    }

    res.status(201);
    res.json(category);
})

// POST REQUEST => CREATE
router.post('/', adminAuth, async (req, res) => {
    const _category = req.body;
    try {
        const category = await Category.create(_category);
        res.status(201);
        res.json({ message: `Category with id ${category.category_id} has been created.`, category });
    } catch (err) {
        res.status(400);
        res.json({message: `there is a problem creating new category.\n${err}`});
    }
})

// PUT REQUEST => UPDATE
router.put('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOne({ where: { category_id: id } });

    if (category === null) {
        res.status(404);
        res.json({
            message: `No category with id ${id} was found.`,
        });
        return;
    }

    try {
        const _category = req.body;
        await Category.update(
            { ..._category },
            {
                where: {
                    category_id: id,
                },
            }
        );
        res.status(201);
        res.json({ message: `Category with id ${id} has been updated.` });
    } catch (err) {
        res.status(400);
        res.json({message: `there is a problem updating category of id ${id}.\n${err}`});
    }
})

// DELETE REQUEST => DELETE
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOne({ where: { category_id: id } });

    if (category === null) {
        res.status(404);
        res.json({
            message: `No catgory with id ${id} was found.`,
        });
        return;
    }

    await Category.destroy({ where: { category_id: id, } });

    res.status(201);
    res.json({ message: `Catgory with id ${id} has been removed.` });
})

// JOIN OPERATIONS
// GET CATEGORY TABLE JOINED WITH BOOK TABLE
router.get("/join/category-book", async (req, res) => {
    const join = await Category.findAll({ attributes: ["category_id", "category"], include: Book, });

    res.status(201);
    res.json(join);
});

// GET bOOK TABLE JOINED WITH USER & BOOK TABLES SPECIFIC RECORD
router.get("/join/category-book/:id", async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOne({
        attributes: ["category_id", "category"],
        category: { category_id: id },
        include: Book,
    });

    if (category === null) {
        res.status(404);
        res.json({
            message: `No category record with id ${id} was found.`,
        });
        return;
    }

    res.status(201);
    res.json(category);
});
module.exports = router;