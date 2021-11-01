window.cpForumsEnhancements = (function() {
	var toReturn = {
		init: function() {
			setInterval(this.interval, 750);
		},

		interval: function() {
			if (this.currentPath !== document.location.pathname) {
				this.currentPath = document.location.pathname;
				this.modifications.forEach(function(m) {
					if (m.path === this.currentPath) {
						this.modificationsWaiting.push(m);
					}
				}.bind(this));
			}

			this.modificationsWaiting = this.modificationsWaiting.filter(function(m) {
				var el = document.querySelector(m.selector);
				if (!el) {
					// Keep this modification in the list until its element appears.
					return true;
				}
				m.callback.call(this, el);
				return false;
			}.bind(this));
		},

		currentPath: null,

		modifications: [],
		modificationsWaiting: [],

		modifyElementForPath: function(path, selector, callback) {
			if (Array.isArray(path)) {
				path.forEach(function(p) {
					this.modifications.push({
						path: p,
						selector: selector,
						callback: callback,
					});
				}.bind(this));
			} else {
				this.modifications.push({
					path: path,
					selector: selector,
					callback: callback,
				});
			}
		},
	};

	Object.keys(toReturn).forEach(function(k) {
		if (typeof toReturn[k] === 'function') {
			toReturn[k] = toReturn[k].bind(toReturn);
		}
	});

	return toReturn;
})();

window.cpForumsEnhancements.modifyElementForPath(
	'/',
	'tr[data-category-id="15"] > td.category .category-description',
	function(el) {
		// Note, the category description text comes from this thread:
		// https://forums.classicpress.net/t/about-the-projects-category/65
		el.innerHTML = (
			'<blockquote style="font-weight: bold; margin: 0; border-width: 0; background: #f3d9f4">'
			+ el.innerHTML.replace(/<a/, '<br><a')
			+ '</blockquote>'
		);
	}
);

window.cpForumsEnhancements.modifyElementForPath(
	[
		// These links usually, but not always, redirect to the canonical URL.
		// See https://forums.classicpress.net/t/make-topic-sticky/3711 which
		// links to `/c/projects/` - clicking this link doesn't redirect.
		'/c/projects',
		'/c/projects/',
		// This is the canonical URL for the category.
		'/c/projects/15',
	],
	'#header-list-area > .contents',
	function(el) {
		var toAdd = document.createElement('blockquote');
		toAdd.innerHTML = (
			'For a list of areas where you can help out, see:'
			+ '<br><a href="/t/currently-active-projects/3630">Currently Active Projects</a>'
		);
		toAdd.setAttribute('style', 'font-weight: bold; margin: 0; border-color: #652d90; background: #f3d9f4');
		el.parentNode.insertBefore(toAdd, el);
	}
);

window.cpForumsEnhancements.init();
