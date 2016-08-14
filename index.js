"use strict";

//Requires
let path = require('path');
require('dotenv').config({path: path.join(__dirname, '/.env')});

//The ip url service that responds with a json with the format:
// { ip: "A.B.C.D" }
let ipUrl = "http://ip.fwok.org";

//First check if we have the api access
if (!process.env.APP_KEY || !process.env.APP_SECRET || !process.env.CONSUMER_KEY) {
    console.error("You need to define the enviromental vars APP_KEY, APP_SECRET and CONSUMER_KEY to run the program. See README.md for more information about usage.");
    process.exit(0);
}

// Args
var argv = require('./lib/myyargs');

//Ovh
if (argv.credentials) {
    require('./lib/credentials');
    process.exit();
}


//Required stuff
let updateDNS = require('./lib/updateDNS');


//Get the remote ip address if there is no ip as param
var ip = argv.ip;
if (!argv.ip) {
    require('./lib/httpGETJSON')(ipUrl).then(function (res) {
        updateDNS(argv.zone, argv.subdomain, res.ip);
    });
} else {
    updateDNS(argv.zone, argv.subdomain, argv.ip);
}


//Update the record with the id
//  /domain/zone/{zoneName}/dynHost/record/{id}
//    Post data: { ip: "", subDomain: "athome" }
// "null" if correct if not Status code: Bad Request (400)
//  and the json data:
//     { "message": "[ip] Given data (192.168.0.1.1) is not valid for type ip" }

//Check that is updated correctly:
//  /domain/zone/{zoneName}/dynHost/record/{id}
// And you will get:
// {
//    ip: "127.0.0.1",
//    zone: "1k8b.com",
//    id: 1397091311,
//    subDomain: "athome"
// }
// */