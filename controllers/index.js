const router = require('express').Router();
const homePage = require('./home');
const profile = require('./profile');
const signup = require('./signup');
const login = require('./login');
const api = require('./api/index')

router.use('/', homePage);
router.use('/profile', profile);
router.use('/api', api);
router.use('/login', login);
router.use('/signup', signup);

module.exports = router;