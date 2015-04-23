Template.user.rendered = function () {
  
};

Template.user.helpers({

    profile_picture: function () {
        var pic = this.profile.picture
        if (pic) {
            return pic;
        }
    },

    favorite_songs: function() {
        return Playlist.get(false, this._id);
    },

    favorite_songs_length: function(attr) {
        var songs = this.favoriteSongs;
        if (attr == "count") {
            return songs.length;
        }
        if (attr == "text") {
            if (songs.length == 1) {
                return " Favorite Song";
            } else {
                return " Favorite Songs";
            }
        }
    },

    uploaded_songs: function() {
        return Playlist.get(false, this._id);
    },

    uploaded_songs_length: function(attr) {
        var songs = this.favoriteSongs;
        var count = Songs.find( {owner: this._id}).count();
        if (attr == "count") {
            return count;
        }
        if (attr == "text") {
            if (count == 1) {
                return " Uploaded Song";
            } else {
                return " Uploaded Songs";
            }
        }
        
    },

});

Template.user.events({

    "click .user-filter": function (event) {
        Session.set('userFilter', event.target.name);
    },

});

Tracker.autorun(function () {

    // User Tab Filtering
    var userFilter = Session.get('userFilter');
    if (userFilter) {
        var filterTarget = '.user-filter[name='+userFilter+']';
        $('.user-filter').removeClass('selected');
        $(filterTarget).addClass('selected');
    }
    
});