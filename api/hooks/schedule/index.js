

module.exports = function schedule(sails) {

    sails.on('lifted', function () {

        var scanner = require('./scanner');

        scanner();


    });

    return {};
}