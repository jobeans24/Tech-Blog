const router = require('express').Router();
const { Post } = require('../models');
const { withGuard } = require('../utils/authGuard');

router.get('/', withGuard, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('dashboard', {posts, dashboard: true, loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/new', withGuard, async (req, res) => {
    res.render('newPost', {dashboard: true, loggedIn: req.session.loggedIn});
}
);

router.get('/edit/:id', withGuard, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({plain: true});

            res.render('editPost', {post, dashboard: true, loggedIn: req.session.loggedIn});
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;