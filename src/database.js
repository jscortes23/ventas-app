const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://joan:cali199911@clusterprogweb.qka5w.mongodb.net/ventas-db-app?retryWrites=true&w=majority')
    .then(db => console.log('DB esta conectado'))
    .catch(err=> console.error(err));