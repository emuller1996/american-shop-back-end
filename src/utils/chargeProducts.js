const data = require('./../../productsInfo.json');
const { Product } = require('../db.js');


const chargeProducts = () =>{
    try {
        const ProductDB= data.map((e) => Product.create({
            name: e.name,
            image: e.image,
            description: e.description,
            price: e.price,
            CategoryId: e.CategoryId,
            rating: e.rating,
            stock: e.stock,
            brand: e.brand,
        }));
        Promise.all(ProductDB).then(()=>console.log('Product successfully charged'));
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports= chargeProducts;