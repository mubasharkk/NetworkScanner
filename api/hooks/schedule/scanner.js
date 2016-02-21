
module.exports = function scanner() {

    var nmap = require('node-libnmap');
    var network = require('network');
   // var ping = require ("net-ping");    

    network.get_gateway_ip(function(err, ip) {
        
        console.log(err || ip);       
        echo(ip);
      });
    
//    if (sails.config.globals.EdimaxDevice.length<1)
//    {
//        for (var j in sails.config.globals.EdimaxDevice)
//        {
//            var session = ping.createSession ();
//            var target=sails.config.globals.EdimaxDevice[j].ip;
//            session.pingHost (target, function (error, target) {
//                if (error)
//                    console.log (target + ": " + error.toString ());
//                else
//                    console.log (target + ": Alive");
//            });
//        }
//    }
//  
    echo= function(ip){
      var opts = {
        range: [
            ip+"-255",
        ],
        flags: ['-sP'],
        ports: '',
     };    
    nmap.scan(opts, function (err, report) {
        if (err)
            throw new Error(err);
        console.log('-- Gathering Network Info --');
        sails.config.globals.network = [];
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
      
      
    };
   
   
}
