const { Size } = require("../db.js");

const createPostSize = async (req, res) => {
  console.log(req.body);
  const sizeCreate = req.body;
  try {
    const size = await Size.create(sizeCreate);
    console.log(size);
    return res.status(201).json({ message: "Size Created." });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

const getAllSize = async (req, res) => {
  try {
    const result = await Size.findAll();
    return res.status(200).json({ sizes: result });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createPostSize,
  getAllSize,
};
