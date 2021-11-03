const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

new UserSchema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

/* Cirfar contraseñas */
UserSchema.methods.encryptPassword = async (password) => {
    /* Indica en numero de veces que aplica el algoritmo */
    const salt = await bcrypt.genSalt(10);

    /* Obtener contraseña cifrada (une contraseña con la cifra) */
    const hash = bcrypt.hash(password, salt);
    return hash;
};

/* Comparar compaseñas cifradas para logear */
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

exports.Schema = mongoose.model('User', UserSchema);