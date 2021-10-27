const mongoose = require('mongoose');

/* Solo trae Schema del paquete */
const { Schema } = mongoose;

const VentaSchema = new Schema({
    title:{type: String, require: true},
    description:{type: String, require: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Venta', VentaSchema);