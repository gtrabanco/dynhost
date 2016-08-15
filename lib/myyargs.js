"use strict";


module.exports = require('yargs').
usage('Usage: $0 -type <A|AA> -zone <DNS Zone> -ip <A.B.C.D> --envfile /path/to/.env').
help('h').
alias('h', 'help').
example('$0 -type A --zone fwok.org --subdomain athome -ip 127.0.0.1').
option('credentials',{
    alias: ['credential', 'c'],
    describe: 'Get the link and consumer key for your app.',
    type: 'boolean'
}).
option('type', {
    alias: 't',
    describe: 'Choose the record type',
    choices: ['A', 'AA'],
    default: 'A',
    type: 'string'
}).
option('zone', {
    alias: ['z', 'domain', 'd'],
    describe: 'Choose the zone to update',
    type: 'string'
}).
option('subdomain', {
    alias: 's',
    describe: 'Choose the subdomain of the zone to update',
    type: 'string'
}).
option('envfile', {
    alias: ['env', 'e'],
    describe: 'The path (includeing the file) to the .env file',
    type: 'string'
}).
option('ip', {
    describe: 'The value of ip address to update it. If not passed the program will try to get the ip address from internet.',
    type: 'string'
}).demand(['zone', 'subdomain']).argv;