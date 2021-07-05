

exports.urlHelper = (addressParam) => {
    if (typeof addressParam === 'string')
        return new Array(addressParam)
    else
        return addressParam
}


exports.urlHttpChecker = (url) => {
    let prefixHTTP = 'http://';
    let prefixHTTPS = 'https://';
    if (url.substr(0, prefixHTTP.length) !== prefixHTTP && url.substr(0, prefixHTTPS.length) !== prefixHTTPS) {
        url = prefixHTTP + url;
    }
    return url
}
