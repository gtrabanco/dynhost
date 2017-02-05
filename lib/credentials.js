"use strict";

var argv = require('./myyargs');

var ovh = require('ovh')({
    endpoint: process.env.APP_EP || 'ovh-eu',
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    debug: ( process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production' ? false : true )
});

var accessRules = [
    //old commented
    // {method: 'GET', path: '/domain/zone/*/dynHost/record'},
    // {method: 'PUT', path: 'domain/zone/' + argv.zone || '*' + '/dynHost/record/*'}
    {method: 'GET', path: '/domain/zone/*'},
    {method: 'PUT', path: '/domain/zone/' + argv.zone}
];

let ck = null;

if (process.env.CONSUMER_KEY) {
    ck = process.env.CONSUMER_KEY;
}

ovh.requestPromised('GET', '/auth/currentCredential').then(function(result, error) {
    if(result.status && result.status.toLocaleLowerCase() !== 'validated') {
        return ovh.requestPromised('POST', '/auth/credential', {accessRules: accessRules});
    } else if (error) {
        return new Promise().reject(error || result);
    }
}).then(function(result, error) {
    console.log(result || error);
    console.log('Restart the app after validating the consumer key with the url that the api provide you.');
    process.exit();
}).catch(function () {
    console.warn("No consumer key and could not be got with the api, try going: https://eu.api.ovh.com/createToken/");
});
