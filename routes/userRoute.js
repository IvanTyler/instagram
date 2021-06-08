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



module.exports = router;
