const { Router } = require('express') // достаем метод router из объекта express
const router = Router() // вызываем метод router
const Post = require('../db/models/post.model')


router.get('/', async (req, res) => {
    const allPosts = await Post.find().sort({ _id: -1 })
    res.render('index', { posts: allPosts })
})

router.patch('/:id', async (req, res) => {
    const {id} = req.params
    const {title} = req.body
    await Post.findByIdAndUpdate(id, {title})
})

module.exports = router;
