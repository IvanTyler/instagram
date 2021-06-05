const express = require('express')
const path = require('path')
const hbs = require("hbs");
const morgan = require("morgan");
const { connect } = require('./db/db');

const indexRouter = require('./routes/indexRoutes')

const app = express()

const PORT = 3000

connect()


app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))


app.use(morgan("dev"));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))


app.use('/', indexRouter);


app.listen(PORT, () => {
    console.log('server work >>>', PORT)
})