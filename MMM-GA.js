/* global Log, Module, moment */

/* Magic Mirror
 * Module: Compliments
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("MMM-GA", {

	// Module config defaults.
	defaults: {
		updateInterval: 15000,
		fadeSpeed: 1000,
	},

	// Define start sequence.
	start: function() {
		this.sendSocketNotification("CONNECT", {max: 5});
		Log.info("Starting module: " + this.name);

		var self = this;
		this.assistantActive = false;
		this.processing = false;
		this.userQuery = null;
	},

  getDom: function() {
    Log.log('Updating DOM for GA');
    var wrapper = document.createElement("div");


    if (this.assistantActive == true) {
      if (this.processing == true) {
        wrapper.innerHTML = "<img src='MMM-GA/assistant_active.png'></img><br/>" + this.userQuery;
      } else {
        wrapper.innerHTML = "<img src='MMM-GA/assistant_active.png'></img>";
      }
    } else {
      wrapper.innerHTML = "<img src='MMM-GA/assistant_inactive.png'></img>";
    }
    return wrapper;
  },

  socketNotificationReceived: function(notification, payload) {
    var self = this;
    delay = self.config.updateDelay;
    if (notification == 'conv_on') {
      this.assistantActive = true;
      delay = 0;
    } else if (notification == 'conv_off') {
      this.assistantActive = false;
      this.processing = false;
    } else if (notification == 'user_reply') {
      this.assistantActive = true;
      this.userQuery = payload;
      this.processing = true;
      delay = 0;
    }
    self.updateDom(self.config.fadeSpeed);
  },

});
