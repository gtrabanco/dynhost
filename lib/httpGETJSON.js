"use strict";

let http = require("http");


module.exports = function (url) {
    return new Promise(function (resolve, reject) {
        http.get(url, function (res) {

            var body = '';

            res.on('data', function (chunck) {
                body += chunck;
            });

            res.on('end', function () {
                resolve(JSON.parse(body));
            })
        }).on('error', function (e) {
            reject(e);
        });
    })
};