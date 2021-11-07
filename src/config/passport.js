/* Para autenticar sesión */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/* Como se interactua con la base de datos */
const User = require('../models/User');

/* Definir una nueva estrategia de autenticación */
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email: email }).lean();
    if (!user) {
        return done(null, false, { menssage: 'Not user found.' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    }
}));

/* Se guarda el usuario ya logeado para no pedirle que inicie sesión nuevamente*/
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/* Finalizar sesión del usuario */
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});