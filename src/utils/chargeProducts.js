const data = require("./../../productsInfo.json");
const { Product, Category, UserAdmin } = require("../db.js");

const chargeProducts = async () => {
  try {
    const categories = [
      { name: "Tennis" },
      { name: "Chanclas" },
      { name: "Pantaloneta" },
    ];
    const CategoryDB = categories.map((c) => Category.create(c));
    await UserAdmin.create({ username: "admin", password: "123", role :"Admin" });
    await UserAdmin.create({ username: "Asesor", password: "123", role :"Asesor" });

    await Promise.all(CategoryDB).then(() =>
      console.log("Categories successfully charged")
    );

    const ProductDB = data.map((e) =>
      Product.create({
        name: e.name,
        image: e.image,
        description: e.description,
        price: e.price,
        CategoryId: e.CategoryId,
        rating: e.rating,
        stock: e.stock,
        brand: e.brand,
      })
    );
    Promise.all(ProductDB).then(() =>
      console.log("Product successfully charged")
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = chargeProducts;
