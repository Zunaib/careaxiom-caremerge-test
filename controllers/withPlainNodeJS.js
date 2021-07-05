const cheerio = require("cheerio");
const request = require("request");
const helper = require("../utils/helper");

exports.getTitle = function (req, res, next) {
    let titleArray = [];
    let counter = 0;
    let addressParam = helper.urlHelper(req.query.address);

    for (var add in addressParam) {
        let url = addressParam[add];
        let urlNew = helper.urlHttpChecker(url);

        request(urlNew, function (error, response, html) {
            if (!error) {
                let parsedHtml = cheerio.load(html);
                let title = parsedHtml("title").text();
                titleArray.push({ url: url, title: '"' + title + '"' });
            } else {
                console.log(error);
                titleArray.push({ url: url, title: "NO RESPONSE" });
            }
            counter++;
            if (counter === addressParam.length) {
                res.render("index", { urls: titleArray });
            }
        });
    }
};
