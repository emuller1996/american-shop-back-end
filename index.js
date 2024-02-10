import  listen  from "./src/app.js";
import { db } from "./src/db.js";
import {chargeProducts} from "./src/utils/chargeProducts.js";

db.sync({ force: true }).then(() => {
  chargeProducts();
  console.log("Database sync");
});

listen.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`); // eslint-disable-line no-console
  //para desactivar el bot solo comentar la siguiente linea

  //client.initialize();
});
