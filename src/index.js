// Pakgace
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
/* Para enviar mensajes entre distintas pantallas */
const flash = require('connect-flash');

// Initiliazations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
/* para usar PUT y DELETE */
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Global Varaibles
/* para guardar los mensajes de flash */
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/ventas'));
app.use(require('./routes/users'));

// Static Files
app.use(express.static(path.join(__dirname,'public')));

// Server es listenning
app.listen(app.set('port'), () => {
    console.log('El servidor esta funcionando por el puerto', app.get('port'));
});