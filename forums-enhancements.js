window.cpForumsEnhancments = {
	init: function() {
		setInterval(this.interval, 750);
	},

	interval: function() {
		if (this.currentPath !== document.location.pathname) {
			console.log('path change', document.location.pathname);
			this.currentPath = document.location.pathname;
		}
	},

	currentPath: null,

	modifications: [],
	modificationsWaiting: [],

	modifyElementForPath: function(path, selector, callback) {
	},
};

window.cpForumsEnhancments.init();
