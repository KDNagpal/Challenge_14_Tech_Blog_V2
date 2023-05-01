const router = require('express').Router();
const authUser = require('../utils/auth');
const {Post, User, Comment} = require('../models');
const { post } = require('./home');

router.get('/:id', authUser, async(req,res) =>{
    const postId = req.params.id
    const postData = await Post.findAll({include:User, where:{id:postId}})
    const plainPostData = postData.get({plain:true})
    const commentData = await Comment.findAll({include:User, where:{post_id:postId}})
    const plainCommentData = commentData.map(comment=>comment.get({plain:true}))
    console.log(plainPostData)
    res.render('comment',{plainPostData, plainCommentData, loggedIn:req.session.loggedIn, user:req.session.user})
});

module.exports = router