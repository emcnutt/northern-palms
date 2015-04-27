Number.prototype.toHHMMSS = function () {
    var seconds = Math.floor(this),
    hours = Math.floor(seconds / 3600);
    seconds -= hours*3600;
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes*60;
    if (seconds < 10) {seconds = "0"+seconds;}
    if (hours < 1) {
    	return minutes+':'+seconds;
    } else {
    	if (minutes < 10) {minutes = "0"+minutes;}
    	return hours+':'+minutes+':'+seconds;
    }
};

// @decimalPlaces (number) *optional*: Number of decimal places, defaults to 0
Number.prototype.shortenNumber = function(decimalPlaces) {
    var str;
    var suffix = '';
    decimalPlaces = decimalPlaces || 0;
    //this = +this;
    var factor = Math.pow(10, decimalPlaces);
    if (this < 1000) {
        str = this;
    } else if (this < 1000000) {
        str = Math.floor(this / (1000 / factor)) / factor;
        suffix = 'K';
    } else if (this < 1000000000) {
        str = Math.floor(this / (1000000 / factor)) / factor;
        suffix = 'M';
    } else if (this < 1000000000000) {
        str = Math.floor(this / (1000000000 / factor)) / factor;
        suffix = 'B';
    } else if (this < 1000000000000000) {
        str = Math.floor(this / (1000000000000 / factor)) / factor;
        suffix = 'T';
    }
    return str + suffix;
};
