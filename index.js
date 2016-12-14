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
})();