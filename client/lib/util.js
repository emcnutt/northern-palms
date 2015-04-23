Accounts.ui.config({
    requestPermissions: {
        facebook: ['publish_actions'],
    }
});


//----- *** -----//


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


//----- *** -----//


hideAddSong = function() {
    $('#addSong-container').addClass('hidden');
    $('#addSong-overlay').addClass('hidden');
    $('#addSong').addClass('hidden');
    $('body').removeClass('fixed');
    resetSongForm();
};

showAddSong = function(songId) {
    $('#addSong').removeClass('hidden');
    $('#addSong-container').removeClass('hidden');
    $('#addSong-overlay').removeClass('hidden');
    $('body').addClass('fixed');
};

showFormMessage = function(formID, message, type) {
    var form = document.getElementById(formID);
    var error = $(form).find('.form-msg');
    $(error).html(message);
    if(type == 'error') {
        $(error).addClass('form-msg-error')
    }
    if(type == 'success') {
        $(error).addClass('form-msg-success')
    }
    $(error).removeClass('hide');
};

resetSongForm = function() {
    Session.set("uploadedSong", null);
    $('.form-upload-loading').addClass('hide');
    $('#form-soundcloud-upload').removeClass('hide');
    $('#form-song-upload').addClass('hide');
    $('#form-song-upload input:checkbox').removeAttr('checked');
    $('#sub-music').prop('checked', true);
    $('#sub-music').prop('checked', true);
};


//----- *** -----//


// Close drawer when clicking off screen
$('html').click(function() {
  $('.dd-wrapper').addClass('hidden');
  $('.sub-filter').removeClass('menu-open');
});

// Stop propagation when drawer is showing
$('.dd-wrapper').click(function(event) {
  event.stopPropagation();
});

// Spacebar acts as pause/play
$(document).keydown(function(e) {
    if (e.target.type == 'textarea' || e.target.type == 'input') {
    } else {
        if (e.keyCode == 32) {
            e.preventDefault();
            if (Player.isPlayerPlaying() == true) {
                Player.pauseSong();
            } else {
                if (Player.isPlayerHidden() == false) {
                    Player.playSong();
                }
            }
        }
    }
});