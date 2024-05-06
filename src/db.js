// Importaciones de módulos
import { Sequelize } from "sequelize";
import modelProduct from "./models/Product.js";
import modelCategory from "./models/Category.js";
import modelUser from "./models/User.js";
import modelDeliveryAddress from "./models/DeliveryAddress.js";
import modelOrder from "./models/Order.js";
import modelOrderDetail from "./models/OrderDetail.js";
import modelUserAdmin from "./models/UserAdmin.js";
import modelMessage from "./models/Message.js";
import modelSize from "./models/Size.js";
import modelProductSize from "./models/ProductSize.js";
import modelImages from "./models/Images.js";
import modelPayment from "./models/Payment.js";
import modelComment from "./models/Comment.js";
import modelSubComment from "./models/SubComment.js";
import modelNotification from "./models/Notification.js";

import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Extracción de variables de entorno
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// Configuración de la instancia de Sequelize
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
    ssl: true,
  }
);

// Definición de modelos
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
modelImages(sequelize);
modelPayment(sequelize);
modelComment(sequelize);
modelSubComment(sequelize);
modelNotification(sequelize);


// Extracción de modelos
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
  Images,
  Payment,
  Comment,
  SubComment,
  Notification,
} = sequelize.models;

// Hooks y relaciones
UserAdmin.beforeCreate(async (user) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

SubComment.belongsTo(Comment);
Comment.hasMany(SubComment);

Comment.belongsTo(Product);
Product.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

Notification.belongsTo(User);
User.hasMany(Notification);

UserAdmin.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
User.hasMany(DeliveryAddress);
DeliveryAddress.belongsTo(User);

Product.belongsToMany(Size, { through: ProductSize });
Size.belongsToMany(Product, { through: ProductSize });

ProductSize.belongsTo(Size);

Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);

Size.hasMany(OrderDetail);
OrderDetail.belongsTo(Size);

Product.hasMany(OrderDetail);
OrderDetail.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Images);
Images.belongsTo(Product);

Order.hasMany(Payment);
Payment.belongsTo(Order);

Order.belongsTo(DeliveryAddress);
DeliveryAddress.hasMany(Order);

Message.belongsTo(Order);
Order.hasMany(Message);

// Exportación de modelos y objeto Sequelize
export {
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
  Images,
  Payment,
  Comment,
  SubComment,
  Notification,
  sequelize as db,
};
