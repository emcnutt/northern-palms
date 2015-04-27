(function(window) {

    Player = {

        soundcloudClientId: "71eb94f201e6b8df2e56c9eaa6f90fc1",
        audio: undefined,
        playlist: [
            "https://api.soundcloud.com/tracks/196675838/stream"
        ],

        getSong: function() {
            return Session.get("playerSong");
        },

        getSongId: function() {
            var song = Session.get("playerSong");
            if (song) {
               return song._id; 
            }
        },

        getSongDuration: function() {
            return Player.audio.duration;
        },

        getSoundLapsed: function() {
            var soundLapsed = Session.get("playerSoundLapsed");
            if (soundLapsed){
                return soundLapsed;
            } else {
                return 0;
            }
        },

        getSoundRemaining: function() {
            var soundLapsed = Player.getSoundLapsed();
            if(soundLapsed) {
                return Player.getSongDuration() - soundLapsed;
            } else {
                return 0;
            }
        },

        // @songId (string): ID of song to load into player
        // @callback (function): returns true if song successfully loaded into player
        loadSong: function(songId, callback) {
            // var song = Songs.findOne(songId);
            // Session.set("playerSong", song);
            // Player.loadSound(songId, function(resp) {
            //     if (resp == true) {
            //         callback(true);
            //     } else {
            //         callback(false);
            //         //TODO - message in player
            //         console.log('fuck');
            //     }
            // });
            Player.loadSound(songId, function(resp) {
                if (resp == true) {
                    callback(true);
                } else {
                    callback(false);
                    //TODO - message in player
                    console.log('fuck');
                }
            });
        },

        // @songId (string) *optional*: ID of song to play
        playSong: function(songId) {
            if (songId) {
                if(Player.getSongId() == songId) { // Checks to see if that song is already loaded in player
                    Player.playSound();
                    
                } else { // Loads new song and plays on successful callback
                    Player.loadSong(songId, function(resp) {
                        if (resp == true) {
                            Player.playSound();
                        }
                    });
                }
            } else { // If there is no song id, assumes to start playing what is loaded
                Player.playSound();
            }
        },

        pauseSong: function() {
            Player.pauseSound();
        },

        playPreviousSong: function() {
            //TODO
            var previousSong = Session.get("playerPreviousSong");
            if (previousSong !== false) {
                Player.playSong();
                var songArray = Session.set("playerSong", previousSong);
            }
        },

        playNextSong: function() {
            //TODO
            var nextSong = Session.get("playerNextSong");
            if (nextSong !== false) {
                Player.playSong(nextSong);
                var songArray = Session.set("playerSong", nextSong);
            }
        },

        isPlayerPlaying: function() {
            return Session.get("isPlayerPlaying");
        },

        isNextSong: function() {
            var nextSong = Session.get("playerNextSong")
            if (nextSong == false) {
                return false
            } else {
                return true
            }
            
        },

        isPreviousSong: function() {
            var previousSong = Session.get("playerPreviousSong")
            if (previousSong == false) {
                return false 
            } else {
                return true
            }
        },

        getPlayerAudioElement: function() {
            return document.querySelector('#player-audio-element');
        },

        playSound: function() {
            Player.audio.play();
            Player.audio.onplay = function() {
                Session.set("isPlayerPlaying", true);
            };
            Player.audio.ontimeupdate = function() {
                Session.set("playerSoundLapsed", Player.audio.currentTime);
                $("#player-seek").attr("value", Player.audio.currentTime);
            };
            Player.audio.onended = function() {
                //TODO - when song ends
            };

        },

        pauseSound: function() {
            Player.audio.pause();
            Player.audio.onpause = function() {
                Session.set("isPlayerPlaying", false);
            };
        },

        // @songId (string): ID of song to stream
        // @callback (function): returns true if stream successfully opened into player
        loadSound: function(callback) {
            var streamUrl = Player.playlist[0] + "?client_id=" + Player.soundcloudClientId;
            Player.audio = Player.getPlayerAudioElement();
            Player.audio.setAttribute('src', streamUrl);
            Player.audio.preload = "metadata";
            Player.audio.onerror = function() {
                callback(false);
                return   
            };
            callback(true);
        },
    }

}(window));