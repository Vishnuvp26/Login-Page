var express = require("express");
var router = express.Router();

const credential = {
    email: "admin@gmail.com",
    password: "123"
}

// Login user
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Succesfull")
    } else {
        res.render('base',{ msg: 'invalid entry' })
    }
});

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard',{user:req.session.user})
    } else{
        res.redirect('/')
        
    }
})

// route for logout
router.get('/logout',(req, res)=> {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.redirect('/dashboard')
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router;