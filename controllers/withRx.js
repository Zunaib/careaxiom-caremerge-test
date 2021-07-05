const Rx = require("rx");
const cheerio = require("cheerio");
const rp = require("request-promise");
const helper = require("../utils/helper");

function getCheerio(modifiedURL, url) {
    var promise = rp({
        uri: modifiedURL,
        transform: function (body) {
            return cheerio.load(body);
        },
    })
        .then((parsedHtml) => {
            let title = parsedHtml("title").text();
            return { url: url, title: '"' + title + '"' };
        })
        .catch((err) => {
            return { url: url, title: "NO RESPONSE" };
        });
    return Rx.Observable.fromPromise(promise);
}

exports.getTitle = (req, res, next) => {
    let observerArray = [];
    let titleArray = [];
    let addressParam = helper.urlHelper(req.query.address);
    for (var add in addressParam) {
        let url = helper.urlHttpChecker(addressParam[add]);
        observerArray.push(getCheerio(url, addressParam[add]));
    }
    const example = Rx.Observable.concat(...observerArray);
    example.subscribe(
        (val) => {
            titleArray.push(val);
        },
        (err) => {
            console.log("Error ", err);
        },
        () => {
            res.render("index", { urls: titleArray });
        }
    );
};
