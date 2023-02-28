const { Router } = require('express');
const { postUser, getUserCheck, blockUser,  getUserByEmail, getUsers } = require('../controllers/usersController.js');

const userRouter = Router();

userRouter.post('/', postUser);

userRouter.get('/', getUsers);

/* userRouter.get('/:email', getUserByEmail); */

userRouter.get('/check/:email', getUserCheck);


module.exports = userRouter;
