#! /usr/bin/env node

"use strict";

process.title = "Node-DynHost";

// Args
var argv = require('./lib/myyargs');

//Ovh Credentials
if (argv.credentials) {
    require('./lib/credentials');
    process.exit();
}

//Requires
const path = require('path');
const fs = require('fs');
const request = require('request');


//First have a look if there is any .env file everywhere and load it if it is
//Checking where is .env file
var dotfile = null;


if (argv.envfile) {
    try {
        fs.accessSync(argv.envfile, fs.F_OK | fs.R_OK);
        dotfile = argv.envfile;
    } catch (e) {
        
    }
} else {
    let paths = ['.env', path.join(process.cwd(), '.env'), path.join(__dirname, '.env'), path.join('~', '.env')];
    paths.forEach(function (k, v) {
        try {
            fs.accessSync(v, fs.F_OK | fs.R_OK);
            return (dotfile = v);
        } catch (e) {
            //Do nothing
        }
    });
}

//Loading .env file
if (dotfile !== null) {
    require('dotenv').config({path: dotfile});
}


//The ip url service that responds with a json with the format:
// { ip: "A.B.C.D" }
let ipUrl = process.env.IP_SERVICE || "https://ip.rqe.es";

//First check if we have the api access
if (!process.env.APP_KEY || !process.env.APP_SECRET || !process.env.CONSUMER_KEY) {
    console.error("You need to define the enviromental vars APP_KEY, APP_SECRET and CONSUMER_KEY to run the program. See README.md for more information about usage.");
    process.exit(0);
}


//Required stuff
var updateDNS = null;
if (argv.regulardns) {
    updateDNS = require('./lib/updateDNS');
} else {
    updateDNS = require('./lib/updateDynDNS')
}


//Get the remote ip address if there is no ip as param
var ip = argv.ip;
if (!argv.ip) {

    let ops = {
        //The ip url service that responds with a json with the format:
        // { data: { ip: "A.B.C.D" }}
        url: process.env.IP_SERVICE || "https://ip.rqe.es",
        headers: {
            "user-agent": "DynHost"
        }
    };

    request(ops, function (err, res, body) {
        if ( !err && response.statusCode == 200 && body && body.data && body.data.ip ) {
            updateDNS(argv.zone, argv.subdomain, body.data.ip, argv.type || 'A', 0);
        } else {
            return console.warn("Error while trying to get the ip address.");
        }
    });
} else {
    updateDNS(argv.zone, argv.subdomain, argv.ip, argv.type || 'A', 0);
}