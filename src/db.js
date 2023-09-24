const { Sequelize } = require("sequelize");
const modelProduct = require("./models/Product.js");
const modelCategory = require("./models/Category.js");
const modelUser = require("./models/User");
const modelDeliveryAddress = require("./models/DeliveryAddress.js");
const modelOrder = require("./models/Order.js");
const modelOrderDetail = require("./models/OrderDetail");
const modelUserAdmin = require("./models/UserAdmin");
const modelMessage = require("./models/Message");
const modelSize = require("./models/Size");
const modelProductSize = require("./models/ProductSize.js");

require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// postgresql://${{ DB_USER }}:${{ DB_PASSWORD }}@${{ DB_HOST }}:${{ DB_PORT }}/${{ DB_NAME }}
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    ssl: true,
  }
);

modelProduct(sequelize);
modelCategory(sequelize);
modelUser(sequelize);
modelDeliveryAddress(sequelize);
modelOrder(sequelize);
modelOrderDetail(sequelize);
modelUserAdmin(sequelize);
modelMessage(sequelize);
modelSize(sequelize);
modelProductSize(sequelize);

const {
  Product,
  Category,
  User,
  DeliveryAddress,
  Order,
  OrderDetail,
  UserAdmin,
  Message,
  Size,
  ProductSize,
} = sequelize.models;

User.hasMany(DeliveryAddress);
DeliveryAddress.belongsTo(User);

Order.belongsToMany(Product, { through: OrderDetail });
Product.belongsToMany(Order, { through: OrderDetail });

Product.belongsToMany(Size, { through: ProductSize });
Size.belongsToMany(Product, { through: ProductSize });

ProductSize.belongsTo(Size);

Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Order.belongsTo(DeliveryAddress);
DeliveryAddress.hasMany(Order);

Message.belongsTo(Order);
Order.hasMany(Message);

module.exports = {
  Product,
  Category,
  User,
  DeliveryAddress,
  Order,
  OrderDetail,
  UserAdmin,
  Message,
  Size,
  ProductSize,
  db: sequelize,
};
