const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  res.json({ mensaje: " conectado a la api", products : [] });
});

module.exports = router;
