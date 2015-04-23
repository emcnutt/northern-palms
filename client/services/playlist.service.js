(function(window) {

    Playlist = {

        list: [],

        set: function(playlistArray, force) {
            if (Playlist.list.length == 0 || force == true) {
                Playlist.list = playlistArray;
            }
        },

        // id(string) = use id to get favorties of certain user id
        get: function(force, id) {
            // Use force == true to force the playlist to update depending on set filters
            if (!force) {
                force = false;
            }
            
            var mixFilter = Session.get('mixFilter');
            var subFilter = Session.get('subFilter');
            var sortFilter = Session.get('sortFilter');
            var userFilter = Session.get('userFilter');

            if (userFilter == "favorites" || subFilter == "favorites") {
                var user = Meteor.user();
                if (id) {
                    user = Meteor.users.findOne({_id: id});
                }
                var favoriteSongs = user.favoriteSongs;
                playlistArray = Songs.find( { _id: { $in: favoriteSongs } }).fetch();
                
                Playlist.set(playlistArray, force);
                return playlistArray;
            }

            if (userFilter == "uploaded") {
                var userId = Meteor.userId();
                if (id) {
                    var user = Meteor.users.findOne({_id: id});
                    userId = user._id;
                }
                playlistArray = Songs.find( {owner: userId}).fetch();
                
                Playlist.set(playlistArray, force);
                return playlistArray;
            }  

            var filterArray = [];
            if (mixFilter && mixFilter !== 'all') {
                filterArray.push({type: mixFilter});
            }
            if (subFilter && subFilter !== 'music') {
                filterArray.push({subs: subFilter})
            }

            if (sortFilter == 'new') {
                var sortFilterObject = {sort: {created_at: -1}};
            }
            if (sortFilter == 'top') {
                var sortFilterObject = {sort: {favorite_count: -1}};
            }

            if (filterArray.length == 0){
                var filterArrayObject = {};
            } else {
                var filterArrayObject = {$and: filterArray};
            }

            playlistArray = Songs.find( filterArrayObject, sortFilterObject ).fetch();

            Playlist.set(playlistArray, force);
            return playlistArray;
        },

    }

}(window));