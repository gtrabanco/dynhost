"use strict";

var ovh = require('ovh')({
    endpoint: process.env.APP_EP || 'ovh-eu',
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    consumerKey: process.env.CONSUMER_KEY,
    debug: ( process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production' ? false : true )
});

module.exports = ovh;