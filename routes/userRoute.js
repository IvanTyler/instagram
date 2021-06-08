const { Router } = require('express') // достаем метод router из объекта express
const router = Router() // вызываем метод router
const Users = require('../db/models/users.model')

router.get('/signup', (req, res) => {
    res.render('registration')
})

router.get('/login', (req, res) => {
    res.render('authorization')
})

router.post('/signup', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (name && email && password) {
        const newUser = await Users.create(req.body)
        if (newUser) {
            req.session.user = { id: newUser._id, name }
            return res.redirect('/')
        }
    }
    return res.status(418).redirect('/user/signup')
})

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (email && password) {
        const currentUser = await Users.findOne({email, password})
        if (currentUser) {
            req.session.user = { id: currentUser._id, name : currentUser.name }
            return res.redirect('/')
        }
    }
    return res.redirect('/user/login')
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.clearCookie();
    return res.redirect('/user/login')
})



module.exports = router;
