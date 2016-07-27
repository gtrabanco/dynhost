"use strict";

module.exports = function (ovh, zoneName, subdomain, ip) {
    //First get the record id (GET)
    // /domain/zone/{zoneName}/dynHost/record
    ovh.requestPromised('GET',
        '/domain/zone/{zoneName}/dynHost/record',
        {
            zoneName: zoneName,
            subDomain: subdomain
        }).
    then(function(res){

        let id = res[0];

        ovh.requestPromised('PUT',
            '/domain/zone/{zoneName}/dynHost/record/{id}',
            {
                zoneName: zoneName,
                id: id,
                ip: ip,
                subDomain: subdomain
            })
            .then(function (res) {
                console.log(res);
                console.info('DNS Updated.');
            })
            .catch(function (err) {
                console.error('Error: ', err);
                console.warn('Error updating the ip address.');
                process.exit(0);
            });

    }).catch(function (err) {

        console.error('Error: ', err);
        console.warn('Error trying to get the zone id for the subdomain.');
        process.exit(0);
    });
};