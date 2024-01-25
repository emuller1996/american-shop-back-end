import { Router } from 'express';

// Importar todos los routers;
// Ejemplo: import authRouter from './auth.js';
import products from './products.js';
import userRouter from './users.routes.js';
import categoryRouters from './categories.routes.js';
import deliveryAddressRouters from './deliveryAddress.routes.js';
import orderRouters from './order.routes.js';
import authRouters from './auth.routes.js';
import messageRouters from './message.routes.js';
import sizeRouters from './size.routes.js';
import commentsRouters from './commnets.routes.js';
import paymentsRouters from './payments.routes.js';

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/products', products);
router.use('/user', userRouter);
router.use('/category', categoryRouters);
router.use('/deliveryAddress', deliveryAddressRouters);
router.use('/order', orderRouters);
router.use('/auth', authRouters);
router.use('/messages', messageRouters);
router.use('/sizes', sizeRouters);
router.use('/comments', commentsRouters);
router.use('/payments', paymentsRouters);

export default router;
