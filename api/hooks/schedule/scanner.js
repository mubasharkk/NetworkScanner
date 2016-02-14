
module.exports = function scanner() {

    var nmap = require('node-libnmap');
    var opts = {
        range: [
            '192.168.1.1-200',
        ],
        flags: ['-sP'],
        ports: '',
    };
    
    nmap.scan(opts, function (err, report) {
        if (err)
            throw new Error(err);
        console.log('-- Gathering Network Info --');
        for (var item in report) {
            for (var i in report[item].host) {

                var values = {
                    ip: report[item].host[i].address[0]["$"].addr,
                    mac: null,
                };
                console.log(report[item].host[i].address[0]["$"]);
                if (typeof report[item].host[i].address[1] != 'undefined') {
                    values.mac = report[item].host[i].address[1]["$"].addr;
                }

                sails.config.globals.network.push(values);
            }
        }

    });
}