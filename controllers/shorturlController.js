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
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
            throw new Error('Invalid URL');
        }
    } catch (err) {
        return res.json({ error: "Invalid URL" });
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
};

const redirectShortUrl = (req, res) => {
    const shortUrlId = req.params.short_url;
    const originalUrl = urlDatabase[shortUrlId];

    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: 'No short URL found for the given input' });
    }
};

module.exports = { createShortUrl, redirectShortUrl };