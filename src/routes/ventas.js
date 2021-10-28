const router = require('express').Router();

const { response } = require('express');

/* Traer los modelos para almacenar datos */
const Venta = require('../models/Venta');

/* Formulario para crear venta */
router.get('/ventas/new', (req, res) => {
    res.render('ventas/new-venta');
});

/* Crear venta y guardar en DB */
router.post('/ventas/new-venta', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Please write Title' });
    } if (!description) {
        errors.push({ text: 'Please write Description' });
    } if (errors.length > 0) {
        res.render('ventas/new-venta', {
            errors,
            title,
            description
        });
    } else {
        const newVenta = new Venta({ title, description });
        await newVenta.save();
        res.redirect('/ventas');
    }
});

/* Mostrar las todas la ventas en la pagina */
router.get('/ventas', async (req, res) => {
    const ventas = await Venta.find().sort({ date: 'desc' }).lean();
    res.render('ventas/all-ventas', { ventas });
});

/* Editar las ventas por id*/
router.get('/ventas/edit/:id', async (req, res) => {
    const venta = await Venta.findById(req.params.id).lean();
    res.render('ventas/edit-venta', { venta });
});

router.put('/ventas/edit-venta/:id', async (req, res) => {
    const { title, description } = req.body;
    await Venta.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect('/ventas');
});

router.delete('/ventas/delete/:id', async (req, res) => {
    await Venta.findByIdAndDelete(req.params.id);
    res.redirect('/ventas');
});

module.exports = router;