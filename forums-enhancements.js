window.cpForumsEnhancments = (function() {
	var toReturn = {
		init: function() {
			console.log('init', this);

			setInterval(this.interval, 750);
		},

		interval: function() {
			console.log('interval', this);

			if (this.currentPath !== document.location.pathname) {
				console.log('path change', document.location.pathname);
				this.currentPath = document.location.pathname;
				this.modifications.forEach(function(m) {
					if (m.path === this.currentPath) {
						this.modificationsWaiting.push(m);
					}
				});
			}

			this.modificationsWaiting = this.modificationsWaiting.filter(function(m) {
				var el = document.querySelector(m.selector);
				if (!el) {
					// Keep this modification in the list until its element appears.
					return true;
				}
				m.callback.call(this, el);
				return false;
			});
		},

		currentPath: null,

		modifications: [],
		modificationsWaiting: [],

		modifyElementForPath: function(path, selector, callback) {
		},
	};

	Object.keys(toReturn).forEach(function(k) {
		if (typeof toReturn[k] === 'function') {
			toReturn[k] = toReturn[k].bind(toReturn);
		}
	});

	return toReturn;
})();

window.cpForumsEnhancments.modifyElementForPath(
	'/',
	'tr[data-category-id=15] > td.category .category-description',
	function(el) {
		el.innerHTML = (
			'<blockquote style="font-weight: bold; margin: 0">'
			+ el.innerHTML
			+ '</blockquote>'
		);
	}
);

window.cpForumsEnhancments.init();
