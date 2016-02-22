
module.exports = function scanner() {

    var nmap = require('node-libnmap');
    var network = require('network');
   // var ping = require ("net-ping");    

    network.get_gateway_ip(function(err, ip) {
        
        console.log(err || ip);       
        echo(ip);
      });

    echo= function(ip){
      var opts = {
        range: [
            ip+"-254",
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
    
    for (var j in sails.config.globals.EdimaxDevice)
    {
        if(sails.config.globals.EdimaxDevice[j].ip!=null)
        {
             var unirest = require('unirest');
             var jstoxml = require('jstoxml');            
             var data = {
                _name: 'SMARTPLUG',
                _attrs: {
                    id: 'edimax'
                },
                _content: {
                    _name: 'CMD',
                    _attrs: {
                        id: 'get',
                    },
                    _content: {
                        _name: 'Device.System.Power.State',                   
                    }
                }
            };
            var xml=jstoxml.toXML(data, {header: true, indent: '  '});

            var Request = unirest.post('http://admin:1234@'+sails.config.globals.EdimaxDevice[j].ip+':10000/smartplug.cgi');

            Request
                    .type('text/xml')
                    .send(xml)
                    .end(function(response){                     
                       console.log(response.body);
                       
                    });
        }
        
        
    }
   
   
}
