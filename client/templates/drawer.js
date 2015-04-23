Template.drawer.helpers({

    expanded_song_comments: function() {
        var expandedSong = Drawer.expandedSong.getSong();
        if (expandedSong) {
            return Song.getComments(expandedSong._id);
        }    
    },

    expanded_song_details: function(key) {
        var expandedSong = Drawer.expandedSong.getSong();
        if (expandedSong) {
            return expandedSong[key];
        }
    },

    expanded_song_track_details: function(key) {
        var expandedSong = Drawer.expandedSong.getSong();
        if (expandedSong) {
            var track = expandedSong.track;
            return track[key];
        }
    },

    expanded_song_owner_details: function(key) {
        var expandedSong = Drawer.expandedSong.getSong();
        if (expandedSong) {
            var owner = Meteor.users.findOne({_id: expandedSong.owner});
            var profile = owner.profile;
            return profile[key];
        }
    },

    expanded_song_created_at: function () {
        var expandedSong = Drawer.expandedSong.getSong();
        if (expandedSong) {
            var date = expandedSong.created_at;
            return moment(date).fromNow();
        }
    },

    // @size (string): Returned size of artwork, see Soundcloud API for sizes
    expanded_song_artwork: function (size) {
        var songId = Drawer.expandedSong.getSongId();
        if (songId) {
            return Song.getArtwork(songId, size);
        }
    },

    isSongFavorited: function () {
        var songId = Drawer.expandedSong.getSongId();
        if (songId) {
            if (Song.isSongFavorited(songId) == true) {
                return "favorited";
            }
        }
    },

    expanded_song_comment_count: function (size) {
        var expandedSong = Drawer.expandedSong.getSong();
        if (expandedSong) {
            return expandedSong.comment_count.shortenNumber();
        }
    },

    expanded_song_favorite_count: function (size) {
        var expandedSong = Drawer.expandedSong.getSong();
        if (expandedSong) {
            return expandedSong.favorite_count.shortenNumber();
        }
    },

    show_delete: function() {
        var expandedSong = Drawer.expandedSong.getSong();
        if (expandedSong) {
            var owner = expandedSong.owner;
            if (owner !== Meteor.userId()) {
                return 'hide'
            }
        }  
    },
  
});


Template.drawer.events({

    // Close drawer by clicking on close button
    "click #drawer-close": function (event) {
        Drawer.hide();
    },

    // Close drawer by clicking on background hover
    "click #drawer-overlay": function (event) {
        Drawer.hide();
    },

    // Go to owner's profile
    "click .post-name": function (event) {
        var expandedSong = Drawer.expandedSong.getSong();
        if (expandedSong) {
            var userId = expandedSong.owner;
            if (userId) {
                Drawer.hide(false);
                Router.go("/users/" + userId);
            }
        }
    },

    // Play song
    "click .drawer-song-play": function (event) {

        var expandedSongId = Drawer.expandedSong.getSongId();
        Player.playSong(expandedSongId);

        // TODO: Update playlist 
        Playlist.get(true);
    },

    // Toggle Like of expanded song
    "click .drawer-song-favorite": function (event) {
        var expandedSongId = Drawer.expandedSong.getSongId();
        Song.toggleFavorite(expandedSongId);
    },

    "click .drawer-song-pause": function (event) {
        Player.pauseSong();
    },

    // Click delete song button
    "click .delete-song": function (event) {
        $('.delete-song').addClass('hide');
        $('.delete-confirm').removeClass('hide');
    },

    // Delete song from prompt
    "click .delete-comment-confirm": function (event) {
        var expandedSongId = Drawer.expandedSong.getSongId();
        Song.deleteSong(expandedSongId);
        $('.delete-confirm').addClass('hide');
        $('.delete-song').removeClass('hide');
        Drawer.hide();
    },

    // Cancel song deletion from prompt
    "click .delete-comment-cancel": function (event) {
        $('.delete-confirm').addClass('hide');
        $('.delete-song').removeClass('hide');
    },

    // Grow text area while typing
    "keyup textarea": function (event) {
        var ele = event.target;
        if (ele.value == "") {
            $(ele).height(25);
            $('.btn-add-comment').addClass('hidden');
            return
        }
        var height =  $(ele).height();
        $('.btn-add-comment').removeClass('hidden');
        if ($(ele).outerHeight() < ele.scrollHeight + 20 ) {
            $(ele).height(ele.scrollHeight - 40);
        }
    },

    // Add comment
    "submit #add-comment": function (event) {
        
        // This function is called when the new task form is submitted
        event.preventDefault();
        var expandedSongId = Drawer.expandedSong.getSongId();
        var comment = $('#add-comment textarea').val();
        Song.addComment(expandedSongId, comment);

        // Clear form
        $('#add-comment textarea').val('');
        $('#add-comment textarea').height(25);
        $('.btn-add-comment').addClass('hidden');

        //Scroll to bottom of comments
        var commentBox = $('#comment-scroll-box');
        commentBox.scrollTop(commentBox.prop('scrollHeight'));

        // Prevent default form submit
        return false;
    },

    // Click on comment sort filter
    "click .expanded-song-tab": function (event) {
        Session.set('expandedSongTab', event.target.name);
    },

});


Tracker.autorun(function () {
    var song = Session.get("expandedSong");
    if(song) {
        if (Player.getSongId() == song._id && Player.isPlayerPlaying()) {
            $('.drawer-song-play').addClass('hide');
            $('.drawer-song-pause').removeClass('hide');
        } else {
            $('.drawer-song-play').removeClass('hide');
            $('.drawer-song-pause').addClass('hide');
        }
    }
});

Tracker.autorun(function () {
    // Mix Filtering
    var expandedSongTab = Session.get('expandedSongTab');
    var sortTarget = '.expanded-song-tab[name='+expandedSongTab+']';
    $('.expanded-song-tab').removeClass('selected');
    $(sortTarget).addClass('selected');
    if(expandedSongTab == "comments") {
        $('.comments-drawer').removeClass('hide');
        $('#details-drawer').addClass('hide');
    }
    if(expandedSongTab == "details") {
        $('#details-drawer').removeClass('hide');
        $('.comments-drawer').addClass('hide');
    }
});


Template.commentSub.helpers({
    sub_name: function() {
        return this;   
    },
});

Template.commentSub.events({
    "click .comment-sub-link": function (event) {
        var ele = event.target;
        Router.go(ele.name);
        Drawer.hide();
    },
});