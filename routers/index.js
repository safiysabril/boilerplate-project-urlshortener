const { Router } = require("express");
const shortUrl = require("./shorturl")
const router = Router();

router.use("/", shortUrl);

module.exports = { router };