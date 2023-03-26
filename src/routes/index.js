const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const products = require('./products.js');
const categoryRouters = require('./categories.routes');
const deliveryAddressRouters = require('./deliveryAddress.routes');
const orderRouters = require('./order.routes');
const authRouters = require('./auth.routes');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/products', products);
router.use('/category', categoryRouters);
router.use('/deliveryAddress', deliveryAddressRouters);
router.use('/order', orderRouters);
router.use('/auth', authRouters);







module.exports = router;
