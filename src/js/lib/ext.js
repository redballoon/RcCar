/**
*  console.log - Fallback for Firefox and IE
*/
if (typeof console !== 'object') {
	var console = { log: function(x) {
		if (window.location.search === '?debug') alert(x);
	} };
}

/**
* string.lpad - String left padding method
* Credit: http://sajjadhossain.com/2008/10/31/javascript-string-trimming-and-padding/
*/
String.prototype.lpad = function(padString, length) {
	var str = this;
	while (str.length < length)
		str = padString + str;
	return str;
}
 
/**
* string.rpad - String right padding method
* Credit: http://sajjadhossain.com/2008/10/31/javascript-string-trimming-and-padding/
*/
String.prototype.rpad = function(padString, length) {
	var str = this;
	while (str.length < length)
		str = str + padString;
	return str;
}

/**
* timeFormat - Format seconds into 00:00 format
*/
function timeFormat(num) {
	num = num.toFixed(0);
	var seconds = num % 60;
	var minutes = parseInt(num / 60);
	
	return minutes.toString().lpad('0',2)+' : '+seconds.toString().lpad('0',2);
}

// Get size of object
// example: Object.size(myObject)
Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

// Drop a cookie with a name, value stored in it, and duration in days it should last
function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

// Gets a cookie by name
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// Deletes a cookie by name
function deleteCookie(name) {
	setCookie(name,"",-1);
}

// Simple timer class 
function Timer() {
	var d = new Date();
	this.current_time = this.start_time = d.getTime();
	this.now = function() {
		this.current_time = d.getTime()/1000;
		var now_time = Math.round((this.start_time - new Date().getTime())/1000);
		return now_time;
	}
}

/*
 * Source : http://sroucheray.org/blog/2009/11/array-sort-should-not-be-used-to-shuffle-an-array/
 * Add a shuffle function to Array object prototype
 * Usage : 
 *  var tmpArray = ["a", "b", "c", "d", "e"];
 *  tmpArray.shuffle();
 */
Array.prototype.shuffle = function (){
	var i = this.length, j, temp;
	if ( i == 0 ) return;
	while ( --i ) {
		j = Math.floor( Math.random() * ( i + 1 ) );
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
};