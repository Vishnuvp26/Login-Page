const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const app = express();
const router = require('./router');
const nocache=require("nocache")
const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(nocache())

app.set('view engine', 'ejs');

//load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/route',router)

//home route
app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    }
    else {
        res.render('base', { title: "Login System" })
    }
})

app.listen(port, () => {
    console.log('Listening to the server on http://localhost:3000')
});
































// const express = require('express');
// const path = require('path');
// const bodyparser = require('body-parser');
// const session = require("express-session");
// const { v4: uuidv4 } = require("uuid");
// const app = express();
// const router = require('./router');
// const nocache=require("nocache")
// const port = process.env.PORT || 3000;

// // Middleware to prevent caching
// app.use((req, res, next) => {
//     // Set no-cache headers
//     res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
//     res.header('Pragma', 'no-cache');
//     res.header('Expires', '0');
//     next();
// });

// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({ extended: true }))
// app.use

// app.set('view engine', 'ejs');

// // Load static assets
// app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// app.use(session({
//     secret: uuidv4(),
//     resave: false,
//     saveUninitialized: true
// }));

// app.use('/route', router)

// // Home route
// app.get('/', (req, res) => {
//     if (req.session.user) {
//         res.render('dashboard', { user: req.session.user })
//     }
//     else {
//         res.render('base', { title: "Login System" })
//     }
// })

// app.listen(port, () => { console.log('Listening to the server on http://localhost:3000') });








