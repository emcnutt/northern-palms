(function(window) {

    Drawer = {

        // @redirect (bool): TODO
        hide: function(redirect) {
            if (redirect !== false) {
                redirect = true;
            }
            $('#drawer-comments').addClass('hidden');
            $('#drawer-overlay').addClass('hidden');
            $('#drawer').addClass('hidden');
            $('.player-comments').removeClass('open');
            $('body').removeClass('fixed');
            Session.set("expandedSongTab", "comments");
            Session.set("isDrawerOpen", false);
            // clear comment form 
            $('#add-comment textarea').val("");
            // Blocks if redirect is false to avoid route change
            if (redirect == false){
                return;
            }
            var route = Router.current();
            route = route.params._sub;
            //var route = Session.get("previousRoute");
            if (route) {
                Router.go(route);
            } else {
                Router.go('home');
            }
        },

        // @songId (string): Id of song to show in drawer
        show: function(songId) {
            var route = Router.current();
            Session.set("previousRoute", route.route._path);
            Session.set("isDrawerOpen", true);
            var subFilter = Session.get("subFilter");
            var userFilter = Session.get("userFilter");
            if (userFilter) {
                Router.go(route.route._path + '/' + subFilter + '/' + songId);
            } else {
                if (subFilter) {
                    Router.go('/' + subFilter + '/' + songId);
                } else {
                    Router.go('/music/'+ songId);
                }
            }
            $('#drawer').removeClass('hidden');
            $('#drawer-comments').removeClass('hidden');
            $('#drawer-overlay').removeClass('hidden');
            $('.player-comments').addClass('open');
            $('body').addClass('fixed');
        },

       

        //----- Song -----//
        expandedSong: {

            setSong: function() {

            },

            getSong: function() {
                return Session.get("expandedSong");
            },

            getSongId: function() {
                var song = Session.get("expandedSong");
                if (song) {
                   return song._id; 
                }
            },

        },

         //----- Add Song -----//
        addSong: {

        },

    }

}(window));