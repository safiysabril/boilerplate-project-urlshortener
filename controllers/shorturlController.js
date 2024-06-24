const dns = require("dns");
const url = require("url");

let urlDatabase = {};
let urlId = 1;

const createShortUrl = (req, res) => {
    const { url: userUrl } = req.body;

    // Validate URL format
    let parsedUrl;
    try {
        parsedUrl = new URL(userUrl);
    } catch (err) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    // Verify URL using dns.lookup
    dns.lookup(parsedUrl.hostname, (err) => {
        if (err) {
            return res.status(400).json({ error: "Invalid URL" });
        } else {
            // Save URL and generate short URL
            urlDatabase[urlId] = userUrl;
            res.json({
                original_url: userUrl,
                short_url: urlId
            });

            urlId++;
        }
    });
}

module.exports = { createShortUrl };