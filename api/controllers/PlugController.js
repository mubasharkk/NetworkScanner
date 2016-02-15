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

        var reqType='OFF';
        var xml = this.createXML(reqType);
        console.log(xml);
        var unirest = require('unirest');


        var Request = unirest.post('http://admin:1234@192.168.1.73:10000/smartplug.cgi');

        Request
                .type('text/xml')
                .send(xml)
               // .headers({'Accept': 'application/json'})
                .end(function(response){
                   // var parser = require('xml2json');
                  //  var json = parser.toJson(response.body);
                   // res.set('Content-Type', 'application/json');
                   console.log(response.body);
                    return res.send(response.body);
                });

    },
    ON: function (req, res) {

        var reqType='ON';
        var xml = this.createXML(reqType);
        console.log(xml);
        var unirest = require('unirest');


        var Request = unirest.post('http://admin:1234@192.168.1.73:10000/smartplug.cgi');

        Request
                .type('text/xml')
                .send(xml)
               // .headers({'Accept': 'application/json'})
                .end(function(response){
                   // var parser = require('xml2json');
                  //  var json = parser.toJson(response.body);
                   // res.set('Content-Type', 'application/json');
                   console.log(response.body);
                    return res.send(response.body);
                });

    },
    OFF: function (req, res) {

        var reqType='OFF';
        var xml = this.createXML(reqType);
        console.log(xml);
        var unirest = require('unirest');


        var Request = unirest.post('http://admin:1234@192.168.1.73:10000/smartplug.cgi');

        Request
                .type('text/xml')
                .send(xml)
               // .headers({'Accept': 'application/json'})
                .end(function(response){
                   // var parser = require('xml2json');
                  //  var json = parser.toJson(response.body);
                   // res.set('Content-Type', 'application/json');
                   console.log(response.body);
                    return res.send(response.body);
                });

    },
    STATUS: function (req, res) {

        var reqType='STATUS';
        var xml = this.createXML(reqType);
        console.log(xml);
        var unirest = require('unirest');


        var Request = unirest.post('http://admin:1234@192.168.1.73:10000/smartplug.cgi');

        Request
                .type('text/xml')
                .send(xml)
               // .headers({'Accept': 'application/json'})
                .end(function(response){
                   // var parser = require('xml2json');
                  //  var json = parser.toJson(response.body);
                   // res.set('Content-Type', 'application/json');
                   console.log(response.body);
                    return res.send(response.body);
                });

    },
    NOW_POWER: function (req, res) {

        var reqType='NOW_POWER';
        var xml = this.createXML(reqType);
        console.log(xml);
        var unirest = require('unirest');


        var Request = unirest.post('http://admin:1234@192.168.1.73:10000/smartplug.cgi');

        Request
                .type('text/xml')
                .send(xml)
               // .headers({'Accept': 'application/json'})
                .end(function(response){
                   // var parser = require('xml2json');
                  //  var json = parser.toJson(response.body);
                   // res.set('Content-Type', 'application/json');
                   console.log(response.body);
                    return res.send(response.body);
                });

    },
     ENERGY_METER: function (req, res) {

        var reqType='ENERGY_METER';
        var xml = this.createXML(reqType);
        console.log(xml);
        var unirest = require('unirest');


        var Request = unirest.post('http://admin:1234@192.168.1.73:10000/smartplug.cgi');

        Request
                .type('text/xml')
                .send(xml)
               // .headers({'Accept': 'application/json'})
                .end(function(response){
                   // var parser = require('xml2json');
                  //  var json = parser.toJson(response.body);
                   // res.set('Content-Type', 'application/json');
                   console.log(response.body);
                    return res.send(response.body);
                });

    },
    createXML: function (requestType) {

        var data=null;
        if(requestType=='ON')
        {
            data = {
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
                    _content: 'ON'
                }
             }
            };
         }
        else if(requestType=='OFF')
        {
              data = {
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
                        _content: 'OFF'
                    }
                }
            };
         }
         else if(requestType=='STATUS')
         {
             data = {
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
         }
         else if(requestType=='NOW_POWER')
         {
             data = {
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
                        _name : "NOW_POWER",
                        _content : [
                            {
                                _name : 'Device.System.Power.NowCurrent'
                            },
                            {
                                _name : 'Device.System.Power.NowPower'
                            }
                        ]
                    }

                }
            };
         }
         else if(requestType=='ENERGY_METER')
         {
              data = {
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
                        _name : "NOW_POWER",
                        _content : [
                            {
                                _name : 'Device.System.Power.NowEnergy.Day'
                            },
                            {
                                _name : 'Device.System.Power.NowEnergy.Week'
                            },
                            {
                                _name : 'Device.System.Power.NowEnergy.Month'
                            }
                        ]
                    }

                }
            };
         }

//        var data = {
//            _name: 'SMARTPLUG',
//            _attrs: {
//                id: 'edimax'
//            },
//            _content: {
//                _name: 'CMD',
//                _attrs: {
//                    id: 'setup',
//                },
//                _content: {
//                    _name: 'Device.System.Power.State',
//                    _content: 'OFF'
//                }
//            }
//        };

//        var data = {
//            _name: 'SMARTPLUG',
//            _attrs: {
//                id: 'edimax'
//            },
//            _content: {
//                _name: 'CMD',
//                _attrs: {
//                    id: 'get',
//                },
//                _content: {
//                    _name : "NOW_POWER",
//                    _content : [
//                        {
//                            _name : 'Device.System.Power.NowCurrent'
//                        },
//                        {
//                            _name : 'Device.System.Power.NowPower'
//                        }
//                    ]
//                }
//                
//            }
//        };

        var jstoxml = require('jstoxml');

        return jstoxml.toXML(data, {header: true, indent: '  '});

    }


};

