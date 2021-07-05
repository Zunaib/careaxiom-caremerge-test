const cheerio = require("cheerio");
const request = require("request");
const RSVP = require('rsvp');
const helper = require("../utils/helper");

const getTitlePromise = (url, urlNew) => {
    return new RSVP.Promise((resolve, reject) => {
        request(urlNew, (error, response, html) => {
            if (!error) {
                let parsedHtml = cheerio.load(html);
                let title = parsedHtml("title").text();
                resolve({ url: url, title: '"' + title + '"' });
            } else {
                reject({ url: url, title: "NO RESPONSE" });
            }
        });
    }).catch(function (err) {
        return err;
    });
};

exports.getTitle = (req, res, next) => {
    let promiseArray = [];
    let titleArray = [];
    let addressParam = helper.urlHelper(req.query.address);
    for (var add in addressParam) {
        let url = addressParam[add];
        let urlNew = helper.urlHttpChecker(url);
        promiseArray.push(getTitlePromise(url, urlNew));
    }

    RSVP.Promise.all(promiseArray).then((data) => {
        titleArray.push(data);
        res.render("index", { urls: data });
    });
};
