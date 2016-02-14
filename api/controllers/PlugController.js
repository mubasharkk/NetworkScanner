/**
 * PlugController
 *
 * @description :: Server-side logic for managing plugs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function (req, res) {

        this._fish(req, res);

    },
    _fish: function (req, res) {

        if (sails.config.globals.network.length < 1) {
            var that = this;
            setTimeout(function () {
                that.fish(req, res);
            }, 5000);

        } else {

            return res.json(sails.config.globals.network);
        }


    },
    status: function (req, res) {

        var urls = [];

        for (var i in sails.config.globals.network) {
            var ip = 'http://' + sails.config.globals.network[i].ip;

            urls.push(sails.config.globals.edimaxUrl.replace("{ip}", ip));
        }

        return res.json(urls);
    },
    test: function (req, res) {

        var xml = this.createXML();

        var unirest = require('unirest');


        var Request = unirest.post('http://admin:1234@192.168.1.119:10000/smartplug.cgi');

        Request
                .type('text/xml')
                .send(xml)
                .end(function(response){
                    res.send(response);
                });


//            var postOptions = {
//              hostname: '192.168.1.119',
//              port: 10000,
//              path: '/smartplug.cgi',
//              method: 'POST',
//              headers: {
//                'Host':'192.168.1.119',
//                'Content-Type':'text/xml;charset=utf-8',
//                'Content-Length': xml.toString().length.toString(),
//              },
//              body : xml
//            };
//            
//            console.log(postOptions)
//            
//            var http = require('http');
//            
//            var request = http.request(postOptions, function(res) {
//              console.log('STATUS: ' + res.statusCode);
//              console.log('HEADERS: ' + JSON.stringify(res.headers));
//              res.setEncoding('utf8');
//              res.on('data', function (chunk) {
//                console.log('BODY: ' + chunk);
//              });
//            });
//
//            request.on('error', function(e) {
//              console.log('problem with request: ' + e.message);
//            });
//
//            // write data to request body
//            request.end();     
//            
//            res.send('Done!'); 

    },
    createXML: function () {

        var data = {
            _name: 'SMARTPLUG',
            _attrs: {
                id: 'edimax'
            },
            _content: {
                _name: 'CMD',
                _attrs: {
                    id: 'setup',
                },
                _content: {
                    _name: 'Device.System.Power.State',
                    _content: 'On'
                }
            }
        };

        var jstoxml = require('jstoxml');

        return jstoxml.toXML(data, {header: true, indent: '  '});

    }


};

