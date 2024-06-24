const { Router } = require("express");
const { createShortUrl, redirectShortUrl } = require("../controllers/shorturlController");

const router = Router();

router.route("/shorturl").post(createShortUrl);
router.route("/shorturl/:short_url").get(redirectShortUrl);

module.exports = router;