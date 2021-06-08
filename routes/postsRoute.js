const { Router } = require('express') // достаем метод router из объекта express
const Post = require('../db/models/post.model')
const router = Router() // вызываем метод router

router.get('/', async (req, res) => {
    const allPosts = await Post.find({author: req.session.user.id}).sort({ _id: -1 })
    console.log(allPosts)
    res.render('posts', { posts: allPosts })
})

// router.get('/:postId', async (req, res) => {
//     const postId = req.params.postId

//     try {
//         const currentPost = await Post.findById(postId)
//         if (currentPost) return res.json(currentPost)
//         return res.redirect('/')
//     } catch (error) {
//         return res.redirect('/')
//     }
// })

router.post('/', async (req, res) => {
    const dataFromClient = req.body
    console.log('data front >>', dataFromClient)
    const newPost = await Post.create(dataFromClient)
    // newPost.author = req.session.user.id
    // res.redirect('/posts/')
    res.json(newPost)
})


router.patch('/:id', async (req, res) => {
    const postId = req.params.id
    const updatePost = await Post.findByIdAndUpdate(postId, {$inc: {likes: 1}}, {new: true})
    console.log(updatePost)
    res.json({likes: updatePost.likes})
})

router.delete('/:id', async (req, res) => {
    const postId = req.params.id;

    try{
        await Post.findByIdAndRemove(postId)
        return res.sendStatus(200)
    } catch (error) {
        return res.sendStatus(500)
    }
})

module.exports = router;
