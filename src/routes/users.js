const router = require('express').Router();

/* Usar modelo de User */
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

/* Por defecto el pone el 'local' */
router.post('/users/signin',passport.authenticate('local',{
    successRedirect: '/ventas',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    /* Validar campos vacios */
    if (name.length<=0) {
        errors.push({text: "Please insert your name"});
    }
    if (email.length<=0) {
        errors.push({text: "Please insert your email"});
    }
    /* Validar contraseñas iguales */
    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password })
    } else {
        const newUser = new User({name, email, password});
        /* Verificar si el email ya fue registrado */
        const emailUser = await User.findOne({email: email}).lean();
        if (emailUser) {
            req.flash('error_msg', 'The email es already in use');
            res.redirect('/users/signup');
        }
        /* Obtener y guardar la contraseña cifrada */
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }
});

module.exports = router;