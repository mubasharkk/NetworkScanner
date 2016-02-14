/**
 * PlugController
 *
 * @description :: Server-side logic for managing plugs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    address: [],
    boostrap: function (cb) {
        
        sails.on('lifted', function(){
            console.log('I am flying!');
            cb();
        });

        var schedule = require('node-schedule');
        var nmap = require('node-libnmap');

        var j = schedule.scheduleJob('*/20 * * * * *', function () {
            console.log('The answer to life, the universe, and everything!');

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

                console.log('-- Sending Response --');

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
                        this.address.push(values);
                    }
                }

            });
        });


    },
    list: function (req, res) {
        return res.json(this.address);
    },
};

