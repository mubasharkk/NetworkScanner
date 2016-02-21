
module.exports = function scanner() {

    var nmap = require('node-libnmap');
    var network = require('network');

    network.get_gateway_ip(function(err, ip) {
        
        console.log(err || ip);       
        echo(ip);
      });
  
    echo= function(ip){
      //console.log('inside eco'+ip); 
     // console.log((ip+"").substring(0,10)+"*");
      var opts = {
        range: [
            ip+"-255",
        ],
        flags: ['-sP'],
        ports: '',
    };
    
   // sails.config.globals.network = [];
    
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
