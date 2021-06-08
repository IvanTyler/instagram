const express = require('express')
const path = require('path')
const hbs = require("hbs")
const morgan = require("morgan")
const sessions = require('express-session')
const MongoStore = require('connect-mongo')

const { connect } = require('./db/db')

const indexRouter = require('./routes/indexRoutes')
const postRouter = require('./routes/postsRoute')
const userRouter = require('./routes/userRoute')


const app = express()

const PORT = 3000

connect()

const secretKey = '1234567'


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))


hbs.registerHelper("linkAddingPosts", () => {
    return new hbs.SafeString(`<li class="nav-menu-item"><a class="nav-menu-link" href="/posts">Добавление постов</a></li>`)
});
hbs.registerHelper("logOut", () => {
    return new hbs.SafeString(`<li class="nav-sign-item"><a class="nav-menu-link" href="/user/logout">Выход</a></li>`)
});

app.use(morgan("dev"));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(sessions({
    name: app.get('cookieName'),
    secret: secretKey,
    resave: false, // Не сохранять сессию, если мы ее не изменим
    saveUnitialized: false, // не сохраняет пустую сессию
    store: MongoStore.create({ // выбираем в качестве хранилища mongoDB
        mongoUrl: 'mongodb://localhost:27017/instagram'
    }),
    cookie: { // настройки, необходимые для корректного работы cookie
        httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
        maxAge: 86400 * 1e3 // устанавливаем время жизни cookie
    }
}))

app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.username = req.session.user.name;
    }
    next()
})

app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/user', userRouter);


app.listen(PORT, () => {
    console.log('server work >>>', PORT)
})