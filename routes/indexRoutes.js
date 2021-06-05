const { Router } = require('express') // достаем метод router из объекта express
const Post = require('../db/models/post.model')
const router = Router() // вызываем метод router

router.get('/', async (req, res) => {
    const allPosts = await Post.find()
    res.render('index')
})

router.get('/posts', async (req, res) => {
    const allPosts = await Post.find()
    res.render('posts', { posts: allPosts })
})

router.post('/posts', async (req, res) => {
    const dataFromClient = req.body
    console.log(dataFromClient)
    await Post.create(dataFromClient)
    res.redirect('/posts')
})

module.exports = router;
