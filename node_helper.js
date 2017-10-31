/* Magic Mirror
 * Module: MMM-Events
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const unirest = require('unirest');
const cheerio = require('cheerio');


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getEvents: function() {
	var self = this;
	var url = 'http://heuteinhamburg.de';
	var events = [];
	unirest.post(url)
		.header("Content-Type", "text/html; charset=utf-8")
		.end(function (r) {
	    		if (!r.error) {
				$ = cheerio.load(r.body);
				$('#post-list').find('.post').each(function() {
					var title = $(this).find('h2').html();
					var today = $(this).find('.post-today').html();
					var datetime = $(this).find('time').attr('datetime');
					time = datetime.split('T');
					if (today != null) {
						events.push({
							title: title,
							startDate: time[0],
							startTime: time[1]
						});
					}
				});
				events.sort(function(x, y){
    					return x.startTime.substring(0,2) - y.startTime.substring(0,2);
				});
				self.sendSocketNotification('EVENTS_RESULT', events);
			}
	});
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_EVENTS') {
            this.getEvents();
        }
    }
});
