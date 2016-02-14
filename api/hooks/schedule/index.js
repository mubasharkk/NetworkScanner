

module.exports = function schedule(sails) {

    sails.on('lifted', function () {

        var scanner = require('./scanner');

        var schedule = require('node-schedule');

        var rule = new schedule.RecurrenceRule();
        rule.second = 50;
        
        scanner();

        var j = schedule.scheduleJob(rule, scanner);
        
        console.log(j);

    });

    return {};
}