const router = require('express').Router();
const authUser = require('../utils/auth');

router.get('/', authUser, async(req,res) => {
    res.render('profile', {loggedIn: req.session.loggedIn, user: req.session})
});

module.exports = router