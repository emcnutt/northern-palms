Session.set("isDrawerOpen", false);
Session.set("playlist", null);

Template.home.rendered = function () {
  
};

Template.home.helpers({
  songs: function () {
    return Playlist.get();
  },
});