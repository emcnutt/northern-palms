
//TODO: Move to global spot
Template.player.rendered = function () {
    Session.set("playerSong", undefined);
    Session.set("playerNextSong", false);
    Session.set("playerPreviousSong", false);
    Session.set("isPlayerHidden", true);
};


Template.player.helpers({

    // @key (string): returns value of 'key' from player song
    player_song_details: function (key) {
        var playerSongId = Player.getSongId();
        if (playerSongId) {
            return Song.getDetails(playerSongId, key);
        }
    },  

    // @key (string): returns value of 'key' from player song
    player_song_user_details: function(key){
        var playerSongId = Player.getSongId();
        if (playerSongId) {
            return Song.getTrackUserDetails(playerSongId, key);
        }
    },

    // @size (string): returns 'size' of artwork. See Soundcloud API for sizes
    player_song_artwork: function (size) {
        var playerSongId = Player.getSongId();
        if (playerSongId) {
            return Song.getArtwork(playerSongId, size);
        }
    },

    is_song_favorite: function () {
        var playerSongId = Player.getSongId();
        if (playerSongId) {
            var isFavorite = Song.isSongFavorited(playerSongId);
            if (isFavorite == true) {
                return "favorited";
            }
        }
    },

    time_position: function () {
        var playerSoundLapsed= Player.getSoundLapsed();
        if (playerSoundLapsed) {
            var position = playerSoundLapsed/Player.getSongDuration();
            return position * 100 + '%';
        } else {
            return '0%';
        }
    },

    time_remaining: function() {
        var soundRemaining = Player.getSoundRemaining();
        return '–' + soundRemaining.toHHMMSS();
    },

    time_lapsed: function() {
        var soundLapsed = Player.getSoundLapsed();
        return soundLapsed.toHHMMSS();
    },

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

Tracker.autorun(function () {
    if (Player.isNextSong() == true) {
        $('#song-next').removeClass('disabled');
    } else {
        $('#song-next').addClass('disabled');
    }
});

Tracker.autorun(function () {
    if (Player.isPreviousSong() == true) {
        $('#song-previous').removeClass('disabled');
    } else {
        $('#song-previous').addClass('disabled');
    }
});

Tracker.autorun(function () {
    if (Player.isPlayerHidden() == true) {
        $('#player').addClass('hidden');
        $('footer').removeClass('spacer');
    } else {
        $('#player').removeClass('hidden');
        $('footer').addClass('spacer');
    }
});
