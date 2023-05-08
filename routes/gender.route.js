const router = require('express').Router();
const adminAuth = require("../middleware/admin.middleware");
const loggedInAuth = require("../middleware/auth.middleware");
const { Gender } = require("../models/index.model");


// GET REQUEST => GET
router.get('/', async (req, res) => {
    const gender = await Gender.findAll({attributes: ["gender_id", "gender"]});

    res.statusCode = 201;
    res.json(gender);
})

// GET REQUEST => GET[INDEX]
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const gender = await Gender.findOne({ attributes: ["gender_id", "gender"], where: { gender_id: id } });

    if (gender === null) {
        res.status(404);
        res.json({
            message: `No gender with id ${id} was found.`,
        });
        return;
    }

    res.status(201);
    res.json(gender);
})

// POST REQUEST => CREATE
router.post('/', loggedInAuth, adminAuth, async (req, res) => {
    const _gender = req.body;
    try {
        const gender = await Gender.create(_gender);
        res.status(201);
        res.json({ message: `Gender with id ${gender.gender_id} has been created.`, gender });
    } catch (err) {
        res.status(400);
        res.json({message: `there is a problem creating new gender.\n${err}`});
    }
})

// PUT REQUEST => UPDATE
router.put('/:id', loggedInAuth, adminAuth, async (req, res) => {
    const { id } = req.params;
    const gender = await Gender.findOne({ where: { gender_id: id } });

    if (gender === null) {
        res.status(404);
        res.json({
            message: `No gender with id ${id} was found.`,
        });
        return;
    }

    try {
        const _gender = req.body;
        await Gender.update(
            { ..._gender },
            {
                where: {
                    gender_id: id,
                },
            }
        );
        res.status(201);
        res.json({ message: `Gender with id ${id} has been updated.` });
    } catch (err) {
        res.status(400);
        res.json({message: `there is a problem updating gender of id ${id}.\n${err}`});
    }
})

// DELETE REQUEST => DELETE
router.delete('/:id', loggedInAuth, adminAuth, async (req, res) => {
    const { id } = req.params;
    const gender = await Gender.findOne({ where: { gender_id: id } });

    if (gender === null) {
        res.status(404);
        res.json({
            message: `No gender with id ${id} was found.`,
        });
        return;
    }

    await Gender.destroy({ where: { gender_id: id, } });

    res.status(201);
    res.json({ message: `Gender with id ${id} has been removed.` });
})

module.exports = router;