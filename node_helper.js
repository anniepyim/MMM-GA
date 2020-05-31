/* global Module */

/* Magic Mirror
 * Module: MMM-syslog
 *
 * By Paul-Vincent Roll http://paulvincentroll.com
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const url = require("url");

module.exports = NodeHelper.create({

	start: function() {
		this.expressApp.get('/ga', (req, res) => {

			var query = url.parse(req.url, true).query;
			var notification = query.notification;
			var reply = query.reply;

			if (notification == null) {
				res.send({"status": "failed", "error": "No notification given."});
			}
			else {
				var log = {"notification": notification, "reply": reply, "timestamp": new Date()};
				res.send({"status": "success", "payload": log});
				this.sendSocketNotification(notification, reply);
				// this.storeLog(log);
			}
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if(notification === "CONNECT"){
			console.log("now initializing assistant");
		}
	},


});