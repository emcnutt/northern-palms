(function(window) {

    Song = {

        // @songId (string): ID of song
        // @size (string) *optional*: Returned size of artwork, see Soundcloud API for sizes, defaults to large
        getArtwork: function(songId, size) {
            size = size || "large";
            var song =  Songs.findOne(songId); 
            var url = song.track.artwork_url;
            if (url) {
                url = url.replace('large', size);
                return url;
            } else {
                // First defaults to user image if no track image
                url = song.track.user.avatar_url;
                if (url) {
                    url = url.replace('large', size);
                    return url;
                } else {
                    // Finally defaults to stock image if no user image
                    return '/img/default-song-pic-1.png';
                }
            }
        },

        // @songId (string): ID of song
        // @key (string): returns value of 'key' from song object
        getDetails: function(songId, key) {
            var song =  Songs.findOne(songId);
            return song[key];
        },

        // @songId (string): ID of song
        // @key (string): returns value of 'key' from song.track object
        getTrackDetails: function(songId, key) {
            var song =  Songs.findOne(songId); 
            var track = song.track;
            return track[key];
        },

        // @songId (string): ID of song
        // @key (string): returns value of 'key' from song.track.user object
        getTrackUserDetails: function(songId, key) {
            var song =  Songs.findOne(songId);
            var user = song.track.user;
            return user[key]; 
        },

        // @songId (string): ID of song
        // @key (string): returns value of 'key' from owner object. defaults to entire owner object
        getOwnerDetails: function(songId, key) {
            var song =  Songs.findOne(songId);
            var owner = song.owner;
            if (key) {
                return owner[key]; 
            } else {
                return owner;
            }
        },

        // @songId (string): ID of song
        getComments: function(songId) {
            return Comments.find({songId: songId}, {sort: {createdAt: 1}});
        },

        // @songId (string): ID of song
        // @comment (string): Comment text
        addComment: function(songId, comment) {
            var affected = Comments.insert({
                songId: songId,
                comment: comment,
                owner: Meteor.userId(),
                upvotes: 0,
                createdAt: new Date(),
            });
            if (affected) { 
                Meteor.call('increaseCommentCount', songId);
            }
        },

        // @songId (string): ID of song
        deleteComments: function(songId) {
        },

        // @songId (string): ID of song
        toggleFavorite: function(songId) {
            var user = Meteor.user();
            var favorites = user.favoriteSongs;
            for (var i = 0 ; i < favorites.length ; i++){
                if (favorites[i] == songId) {
                    Meteor.call("unfavoriteSong", songId);
                    return;
                }
            }
            Meteor.call("favoriteSong", songId);
        },

        // @songId (string): ID of song
        isSongFavorited: function(songId) {
            var user = Meteor.user();
            var favorites = user.favoriteSongs;
            for (var i = 0 ; i < favorites.length ; i++){
                if (favorites[i] == songId) {
                  return true;
                }
            }
            return false;
        },

        // @songId (string): ID of song
        deleteSong: function(songId) {
            Meteor.call("deleteSong", songId);
        },

    }

}(window));