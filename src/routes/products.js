import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  createSizeProduct,
  getSizeProduct,
  getProductsPublished,
  getCommetsByUser,
  postCreateCommetsByUser,
} from "../controllers/productsController.js";

import {
  createPostImagesByProduct,
  getImagesByProduct,
} from "../controllers/ImagesControllers.js";
import { validateTokenAdmin, validateToken, login } from "../utils/authjws.js";
import { validateRole } from "../middlewares/authRole.middleware.js";
import xlsx from "xlsx";
import { Product } from "../db.js";

import pkg from "express-fileupload";

const fileUpload = pkg;
const productRouter = Router();

productRouter.get(
  "/",
  validateToken,
  validateRole(["Admin", "Asesor"]),
  getProducts
);
productRouter.get("/published", getProductsPublished);

productRouter.get("/:id", getProductById);
productRouter.post("/", validateToken, validateRole(["Admin"]), createProduct);
productRouter.post(
  "/:id/size",
  validateToken,
  validateRole(["Admin", "Asesor"]),
  createSizeProduct
);
productRouter.post(
  "/import-excel",
  validateRole(["Admin"]),
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
  async (req, res) => {
    try {
      const { file } = req.files;
      console.log(file);
      if (!file) {
        return res.status(400).send("No se ha seleccionado ningún archivo");
      }

      const workbook = xlsx.readFile(file.tempFilePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(worksheet);
      console.log(data);
      const r = await Product.bulkCreate(data);

      return res.json({
        message: "Import Se ha Realizado con exito",
        productos: r,
      });
    } catch (error) {
      res.status(500).send("Error al procesar el archivo: " + error.message);
    }
  }
);
productRouter.post("/:id/comments", login, postCreateCommetsByUser);
productRouter.post(
  "/:id/images",
  validateToken,
  validateRole(["Admin", "Asesor"]),
  createPostImagesByProduct
);
productRouter.get(
  "/:id/size",
  validateToken,
  validateRole(["Admin", "Asesor"]),
  getSizeProduct
);
productRouter.get("/:id/images", getImagesByProduct);
productRouter.get("/:id/comments", getCommetsByUser);

productRouter.put("/", validateTokenAdmin, updateProduct);

export default productRouter;
