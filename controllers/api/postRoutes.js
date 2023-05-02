const router = require('express').Router();
const { traceDeprecation } = require('process');
const {User, Post, Comment} = require('../../models')
const authUser = require('../../utils/auth');

router.post('/newpost', async(req,res) => {
    try{
        const {title,body} = req.body
        const postData = await Post.create({post_title:title, post_body:body, user_id:req.session.user.id,})
        if (!postData)return res.status(400).json({msg: 'Post not created!'})
        res.status(200).json('Posted')
    } catch (err){
        res.status(500).json(err)
    }
});

router.post('/newcomment', async(req, res) => {
    try{
    const {body, postId} = req.body

    const postData = await Comment.create({comment_body:body, post_id: postId, user_id:req.session.user.id})
    if (!postData) return res.status(400).json("Comment not created!")

    res.status(200).json("Comment created!")

    } catch (err){res.status(500).json(err)}
})

router.put('/editpost', async(req,res) => {
    try { const {body,id} = req.body
        const postData = await Post.update({post_body:body}, {where:{id}})
    if (!postData)return res.status(400).json('Post not updated!')
    res.status(200).json('Post updated!')}
    catch(err){res.status(500).json(err)}
})
router.delete('/deletepost', async(req,res) => {
    try { const {id} = req.body
        const postData = await Post.destroy({where:{id}})
    if (!postData)return res.status(400).json('Unable to delete post!')
    res.status(200).json('Post deleted!')}
    catch(err){res.status(500).json(err)}
})

module.exports = router;
