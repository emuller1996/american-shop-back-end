const { Router } = require('express');
const {getCategories, postCategory, updateCategory, deleteCategory } = require('../controllers/categoryController.js');

const categoryRouter = Router();


categoryRouter.get('/', getCategories);

categoryRouter.post('/:name', postCategory);

categoryRouter.put('/:id/:category', updateCategory);

categoryRouter.delete('/:id',deleteCategory);

module.exports = categoryRouter;