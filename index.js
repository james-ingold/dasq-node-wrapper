(function() {
    'use strict';
    try {
    require('dotenv').config();
    }catch(e) {}
    var dasqWrapper = require('./lib/dasq');

    var dasq = new dasqWrapper(process.env.CLIENTID, process.env.SECRET);
    return dasq.signals().then(function(result) {
        console.log(result);
    });
    // return dasq.devices().then(function(devices) {
    //     return dasq.createSignal('Test Signal', devices[1].pid, devices[1].zones[0].id, '#00F').then(function(result) {
    //         return console.log(result);
    //     });
    // });
})();