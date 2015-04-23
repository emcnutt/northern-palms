Template.songTile.helpers({
    
    // @size (string): Returned size of artwork, see Soundcloud API for sizes
    song_artwork: function (size) {
        return Song.getArtwork(this._id, size);
    },

    subs: function() {
        var subs = this.subs;
        var newSubs = [];
        for (var i = 0; i < subs.length; i++) {
            if (subs[i] !== 'music') {
                newSubs.push(subs[i]);
            }
        }
        return newSubs;
    },

    comment_count: function () {
        var count = this.comment_count;
        return count.shortenNumber();
    },

    favorite_count: function () {
        var count = this.favorite_count;
        return count.shortenNumber();
    },

    isSongFavorite: function() {
        var isFavorite = Song.isSongFavorited(this._id);
        if (isFavorite == true) {
            return "favorited";
        }
    }

});


Template.songTile.events({

    // Play song
    "click .song-play": function (event) {
        Player.playSong(this._id);
        //TODO: Manage playlist 
        // Update playlist 
        Playlist.get(true);
    },

    // Open song comment drawer
    "click .open-comments": function (event) {
        //TODO - drawer
        Drawer.show(this._id);
    },

    // Delete Song
    "click .delete-song": function (event) {
        Song.deleteSong();
    },

    // Toggle Favorite
    "click .favorite-song": function (event) {
        Song.toggleFavorite(this._id);
    },

});
