const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { withoutGuard } = require('../utils/authGuard');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('post', { post, loggedIn: req.session.loggedIn });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/login', withoutGuard, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    } 
    res.render('login');
}
);

router.get('/signup', withoutGuard, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
}
);

module.exports = router;