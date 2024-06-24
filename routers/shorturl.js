const { Router } = require("express");
const { createShortUrl } = require("../controllers/shorturlController");

const router = Router();

router.route("/shorturl").post(createShortUrl);

module.exports = router;