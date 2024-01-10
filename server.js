require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const clientRoutes = require('./routes/clientRoutes');

const port = process.env.PORT || 3000;

//Run application
const app = express();

//Setup session
var sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

//Serving static files
app.use(express.static(path.join(__dirname, 'assets')));

//Setup ejs
app.set('view engine', 'ejs');
app.set('views', 'pages');

//Important middlewares
app.use(clientRoutes)

app.use((req, res) => {
    res.redirect('/404')
})

app.listen(port, (err) => console.log(err || `Visit http://localhost:${port}/`))