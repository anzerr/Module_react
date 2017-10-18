"use strict";

module.exports = function() {
	return ([
		{
			method: ['get'],
			path: '/react/json',
			action: {
				controller: 'file',
				method: 'getMap'
			}
		},
		{
			method: ['get'],
			path: '/react.min',
			action: {
				controller: 'file',
				method: 'getCore'
			}
		},
		{
			method: ['get'],
			path: '/react.raw',
			action: {
				controller: 'file',
				method: 'getCoreRaw'
			}
		},
		{
			method: ['get'],
			path: '/react/:file.min',
			param: {file: '.*'},
			action: {
				controller: 'file',
				method: 'get'
			}
		}
	]);
};
