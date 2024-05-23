const router = require('express').Router();
const { Post } = require('../../models');
const {apiGuard} = require('../../utils/authGuard');

router.post('/', apiGuard, async (req, res) => {
    const body = req.body;

    try {
        const newPost = await Post.create({
            ...body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', apiGuard, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        } 
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.delete('/:id', apiGuard, async (req, res) => {
    try {
        const [affectedRows] = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;
