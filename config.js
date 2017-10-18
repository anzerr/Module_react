"use strict";

module.exports = function() {
	return ({
		route: [
			'config/file.js'
		],
		cdn: [
			{
                path: '/react/',
                priority: 2,
                source: 'public/lib'
            }
		],
		import: [
			{
				module: 'generic',
				as: 'webapp',
				path: '/entity/webapp.js'
			}
		]
	});
};
