const withGuard = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

const apiGuard = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.status(403).json({ message: 'You must be logged in to do that' });
    } else {
        next();
    }
};

const withoutGuard = (req, res, next) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = { withGuard, apiGuard, withoutGuard };