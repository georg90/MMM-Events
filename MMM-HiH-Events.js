/* Magic Mirror
 * Module: MMM-Events
 *
 * By Mykle1 -  Brometheus #1 consultant and all around good dude!
 *
 */
Module.register("MMM-HiH-Events", {

    // Module config defaults.
    defaults: {
	maxLength: "40",             // adjust to your liking 
	animationSpeed: 3000,          // Event fades in and out
        initialLoadDelay: 4250,
        retryDelay: 2500,
	updateInterval: 60 * 60 * 1000, // 60 minutes. No need to change!
    },

    getStyles: function() {
        return ["MMM-HiH-Events.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        // Set locale.
        this.event = {};
        this.rotateInterval = null;
        this.scheduleUpdate();
    },

    getDom: function() {
	var wrapper = document.createElement("div");
		if (!this.loaded) {
			wrapper.innerHTML = "Loading events ...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var table = document.createElement("table");
		table.className = "MMM-HiH-Events";
		this.event = this.event.slice(0,this.config.maximumEntries);
		for (var t in this.event) {
			var event = this.event[t];
			if (event.title.length > this.config.maxLength) {
						event.title = event.title.substring(0,this.config.maxLength);
						event.title = event.title + "..";
			}
			var row = document.createElement("tr");
			table.appendChild(row);
			
			var eventNameCell = document.createElement("td");
			eventNameCell.innerHTML = event.title;
			eventNameCell.className = "align-left bright";
			row.appendChild(eventNameCell);

			var depCell = document.createElement("td");
			depCell.className = "startTime";
			depCell.innerHTML = event.startTime;
			row.appendChild(depCell);

			if (this.config.fade && this.config.fadePoint < 1) {
				if (this.config.fadePoint < 0) {
					this.config.fadePoint = 0;
				}
				var startingPoint = this.event.length * this.config.fadePoint;
				var steps = this.event.length - startingPoint;
				if (t >= startingPoint) {
					var currentStep = t - startingPoint;
					row.style.opacity = 1 - (1 / steps * currentStep);
				}
			}

		}

		return table;
	},

    processEvents: function(data) {
	console.log(data);
        this.event = data;
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getEvents();
        }, this.config.updateInterval);
        this.getEvents(this.config.initialLoadDelay);
        var self = this;
    },

    getEvents: function() {
        this.sendSocketNotification('GET_EVENTS');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "EVENTS_RESULT") {
            this.processEvents(payload);
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
