Favorites = new Mongo.Collection("favorites");

Meteor.methods({
	
	addSongToFavorites: function (songId) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
    	throw new Meteor.Error("not-authorized");
    }

    Favorites.insert({
    	song_id: songId,
      owner: Meteor.userId(),
      created_at: new Date(),
    }, function(id) {
    });

  },

  deleteSongFromFavorites: function (songId) {
  	if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var user = Meteor.userId();
    Favorites.remove({song_id: songId, owner: user});
  },

});

if (Meteor.isClient) {
  Meteor.subscribe("favorites");
}

if (Meteor.isServer) {
  Meteor.publish("favorites", function () {
    var user = this.userId;
    return Favorites.find({owner: user});
  });
}