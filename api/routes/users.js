const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// update
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json('You can update only your account.');
    }
});

// delete

// get user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
