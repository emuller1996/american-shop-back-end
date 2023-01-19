const { Product } = require('../db.js');
const { Op } = require("sequelize");

const getProducts = async (req, res) => {
    const pageNumber = Number.parseInt(req.query.page);
    const sizeNumber = Number.parseInt(req.query.size);
    const cat        = req.query.cat //recibo la categoria x query en la variable cat
    const orderPrice = req.query.ordprice; // Se recibe por query el criterio de ordenacion EJ: &ordprice=ASC
    const search     = req.query.search; // en caso de llamar este endpoint para search x query enviar EJ: &search=iPhone
    const brand     = req.query.brand; // en caso de llamar este endpoint para brands x query enviar EJ: &brand=Apple
    const disc      = req.query.disc; //en caso de tener un descuento aplicado
        
    let page  = 0;
    let size  = 12;
    let where = {};
    let order = [["id", "ASC"]];

    if(!Number.isNaN(pageNumber) && pageNumber > 0) page = pageNumber;
    if(!Number.isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 12) size = sizeNumber;
    if(cat) where.CategoryId=cat;
    if(brand) where.brand=brand;
    if(orderPrice) order = [["price", orderPrice]];
    if(search?.length>0) where.name = {[Op.iLike]: `%${search}%`};
    if(disc) where.OfferId = disc;

    try{
        const products = await Product.findAndCountAll({
            where,
            order,
            limit: size,
            offset: page * size,
            
        });
        return res.status(200).json({
            totalPages: Math.ceil(products.count / size), 
            products: products.rows
        })
    }catch{
        res.status(201).json({ error: "Product not found" });
    }
}



module.exports = {
    getProducts
}