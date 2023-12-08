const data = require("./../../productsInfo.json");
const { Product, Category, UserAdmin, Size } = require("../db.js");

const chargeProducts = async () => {
  try {
    const sizes = [
      { size: "7 US" },
      { size: "8 US" },
      { size: "8.5 US" },
      { size: "9.5 US" },
      { size: "10 US" },
    ];

    const sizesDB = sizes.map((c) => Size.create(c));
    await Promise.all(sizesDB).then(() =>
      console.log("sizes successfully charged")
    );

    const categories = [
      { name: "Tennis" },
      { name: "Chanclas" },
      { name: "Pantaloneta" },
    ];
    const CategoryDB = categories.map((c) => Category.create(c));
    await Promise.all(CategoryDB).then(() =>
      console.log("Categories successfully charged")
    );

    await UserAdmin.create({
      username: "admin",
      password: "123",
      role: "Admin",
    });
    await UserAdmin.create({
      username: "Asesor",
      password: "123",
      role: "Asesor",
    });

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
