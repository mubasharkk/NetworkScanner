/**
 * PlugController
 *
 * @description :: Server-side logic for managing plugs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
 
    list: function (req, res) {
    
       var sleep = require('sleep');
       
       if (sails.config.globals.network.length < 1){
           sleep.sleep(10);
       }
       
       return res.json(sails.config.globals.network);
        
    },
    
};

