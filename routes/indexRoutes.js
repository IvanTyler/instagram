const { Router } = require('express') // достаем метод router из объекта express
const router = Router() // вызываем метод router

router.get('/', async (req, res) => {
    res.render('index')
})

module.exports = router;
