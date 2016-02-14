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

        var xml = this.createXML(req.param('state'));

        var unirest = require('unirest');


        var Request = unirest.post('http://admin:1234@192.168.1.119:10000/smartplug.cgi');

        Request
                .type('text/xml')
                .send(xml)
                .headers({'Accept': 'application/json'})
                .end(function(response){
                    var parser = require('xml2json');
                    var json = parser.toJson(response.body);
                    res.set('Content-Type', 'application/json');
                    return res.json(json);
                });

    },
    createXML: function (state) {

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
                    _content: state.toUpperCase()
                }
            }
        };

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

