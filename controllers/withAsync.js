const async = require("async");
const cheerio = require("cheerio");
const request = require("request");
const helper = require("../utils/helper");

exports.getTitle = (req, res, next) => {
    let titleArray = [];
    let addressParam = helper.urlHelper(req.query.address);
    async.each(
        addressParam,
        (url, callback) => {
            let urlNew = helper.urlHttpChecker(url);
            request(urlNew, (error, response, html) => {
                if (!error) {
                    let parsedHtml = cheerio.load(html);
                    let title = parsedHtml("title").text();
                    titleArray.push({ url: url, title: '"' + title + '"' });
                    callback();
                } else {
                    titleArray.push({ url: url, title: "NO RESPONSE" });
                    callback(`url: ${url} - NO RESPONSE`);
                }
            });
        },
        function (err) {
            if (err) {
                console.log(`Error occured :  ${err}`);
                res.render("index", { urls: titleArray });
            } else {
                res.render("index", { urls: titleArray });
            }
        }
    );
};
