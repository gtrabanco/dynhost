"use strict";

var ovh = require('./myovh');


module.exports = function (zoneName, subdomain, ip) {
    
    //First get the record id (GET)
    // /domain/zone/{zoneName}/record
    return ovh.requestPromised('GET',
        '/domain/zone/{zoneName}/record',
        {
            zoneName: zoneName,
            subDomain: subdomain
        })/*
    .then(function(res){

        console.log(res);

        let id = res[0];

        return ovh.requestPromised('PUT',
            '/domain/zone/{zoneName}/record/{id}',
            {
                zoneName: zoneName,
                id: id,
                record: {
                    subDomain: subdomain,
                    ttl: 60,
                    target: ip
                }
            });

    })*/
    .catch(function (err) {

        console.error('Error: ', err);
        console.warn('Error trying to get the zone id for the subdomain.');
        process.exit(1);
    });
};