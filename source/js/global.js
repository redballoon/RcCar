var $ = require('jquery');

// Credit: http://stackoverflow.com/a/8764051/1026756
function getURLParameter(name) {
	'use strict';
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [,""])[1].replace(/\+/g, '%20')) || null;
}


$(function () {

	console.log('ready');
});