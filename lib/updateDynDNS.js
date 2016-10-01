"use strict";

var ovh = require('./myovh');


module.exports = function (zoneName, subdomain, ip, type = null, ttl = null) {
    
    //First get the record id (GET)
    // /domain/zone/{zoneName}/dynHost/record
    return ovh.requestPromised('GET',
        '/domain/zone/{zoneName}/dynHost/record',
        {
            zoneName: zoneName,
            subDomain: subdomain
        }).
    then(function(res){

        let id = res[0];

        return ovh.requestPromised('PUT',
            '/domain/zone/{zoneName}/dynHost/record/{id}',
            {
                zoneName: zoneName,
                id: id,
                ip: ip,
                subDomain: subdomain
            });

    })
    .catch(function (err) {

        console.error('Error: ', err);
        console.warn('Error trying to get the zone id for the subdomain.');
        process.exit(1);
    });
};