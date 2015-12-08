(function(window) {

    Player = {

        soundcloudClientId: "71eb94f201e6b8df2e56c9eaa6f90fc1",
        audio: undefined,
        currentSong: 0,
        playlist: [
            "https://api.soundcloud.com/tracks/78800969/stream"
        ],

        playPreviousSong: function() {
            var currentSong = Player.currentSong;
            var playlistLength = Player.playlist.length;
            var nextSong = currentSong - 1;
            console.log(currentSong);
            if (currentSong == 0) {
                nextSong = playlistLength - 1;
            }
            console.log(nextSong);
            Player.currentSong = nextSong;
            Player.loadSong();
            Player.playSong();
        },

        playNextSong: function() {
            var currentSong = Player.currentSong;
            var playlistLength = Player.playlist.length;
            var nextSong = currentSong + 1;
            console.log(currentSong);
            console.log(playlistLength);
            if (currentSong == playlistLength - 1) {
                nextSong = 0;
            }
            console.log(nextSong);
            Player.currentSong = nextSong;
            Player.loadSong();
            Player.playSong();
        },

        isPlayerPlaying: function() {
            return Session.get("isPlayerPlaying");
        },

        getPlayerAudioElement: function() {
            return document.querySelector('#player-audio-element');
        },

        playSong: function() {
            Player.audio.play();
            Player.audio.onplay = function() {
                Session.set("isPlayerPlaying", true);
            };
            Player.audio.ontimeupdate = function() {
                // Session.set("playerSoundLapsed", Player.audio.currentTime);
                // $("#player-seek").attr("value", Player.audio.currentTime);
            };
            Player.audio.onended = function() {
                Player.playNextSong();
            };
        },

        pauseSong: function() {
            Player.audio.pause();
            Player.audio.onpause = function() {
                Session.set("isPlayerPlaying", false);
            };
        },

        // @songId (string): ID of song to stream
        // @callback (function): returns true if stream successfully opened into player
        loadSong: function(callback) {
            var streamUrl = Player.playlist[Player.currentSong] + "?client_id=" + Player.soundcloudClientId;
            Player.audio = Player.getPlayerAudioElement();
            Player.audio.setAttribute('src', streamUrl);
            Player.audio.preload = "metadata";
        },
    }

}(window));
