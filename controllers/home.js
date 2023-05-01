const { Post, User } = require('../models');

const router = require('express').Router();

router.get('/', async(req, res) => {
    const posts = await Post.findAll({include:User})
    const blogPosts = posts.map(post => post.get({plain:true}))
    res.render('homepage', {blogPosts, loggedIn:req.session.loggedIn, user:req.session.user})
})

module.exports = router