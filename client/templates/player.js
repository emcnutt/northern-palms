
//TODO: Move to global spot
Template.player.rendered = function () {
    Session.set("playerSong", undefined);
    Session.set("playerNextSong", false);
    Session.set("playerPreviousSong", false);
};


Template.player.helpers({


});


Template.player.events({

    // Pause Song
    "click #song-pause": function (event) {
        Player.pauseSong();
    },

    // Play Song
    "click #song-play": function (event) {
        Player.playSong();
    },

    // Play Next Song
    "click #song-next": function (event) {
        Player.playNextSong();
    },

    // Play Previous Song
    "click #song-previous": function (event) {
        Player.playPreviousSong();
    },

    // Scrub song
    "click .song-tracker": function (event) {
        event.stopPropagation();
        var target = event.target;
        var distance = $(target).offset().left;
        distance = event.pageX - distance;
        var elementWidth = $('.song-tracker').width();
        var position = distance / elementWidth;
        var songDuration = Player.getSongDuration();
        var newPosition = songDuration * position;
        newPosition = Math.round(newPosition);
        Player.audio.currentTime = newPosition;
    },

    "click .player-comments": function (event) {
        //TODO - Drawer refactor
        var drawer = Session.get("isDrawerOpen");
        if (drawer == true) {
            Drawer.hide();
        } else {
            Drawer.show(Player.getSongId());
        }
    },

    "click .player-favorite": function (event) {
        Song.toggleFavorite(Player.getSongId());
    },

});


Tracker.autorun(function () {
	if (Player.isPlayerPlaying() == true) {
        $('#song-pause').removeClass('hide');
        $('#song-play').addClass('hide');
    } else {
        $('#song-pause').addClass('hide');
        $('#song-play').removeClass('hide');
    }
});