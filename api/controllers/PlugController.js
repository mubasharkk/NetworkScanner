/**
 * PlugController
 *
 * @description :: Server-side logic for managing plugs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function (req, res) {
        
        var nmap = require('node-libnmap');
        
        var opts = {
            range: [
              '192.168.1.80/120',
            ]
        };

        nmap.discover(opts, function(err, report) {
          if (err) throw new Error(err);

          console.log('-- Sending Response --');
           return res.json(report);
//          for (var item in report) {
//            console.log(report);
//          }
        });
        
    },
};

