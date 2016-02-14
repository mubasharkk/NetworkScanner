/**
 * PlugController
 *
 * @description :: Server-side logic for managing plugs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function (req, res) {

        this.fish(req, res);

    },
    fish: function (req, res) {

        if (sails.config.globals.network.length < 1) {
            var that = this;
            setTimeout(function() {
              that.fish(req, res);
            }, 5000);
            
        } else {
            
            return res.json(sails.config.globals.network);
        }


    }

};

