Songs = new Mongo.Collection("songs");

Meteor.methods({
	
	addSong: function (data) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
    	throw new Meteor.Error("not-authorized");
    }

    Songs.insert({
    	track: data.track,
      title: data.title,
      artist: data.artist,
      remix_artist: data.remix_artist,
      type: data.type,
      genre: data.genres,
    	source: data.source,
      subs: data.subs,
      favorite_count: 0,
      comment_count: 0,
      owner: Meteor.userId(),
      created_at: new Date(), 
    }, function(id) {
    });

  },

  increaseCommentCount: function(songId) {
    Songs.update(songId, {$inc: {comment_count: 1}});
  },

  decreaseCommentCount: function(songId) {
    Songs.update(songId, {$inc: {comment_count: -1}});
  },

  favoriteSong: function(songId) {
    var affected = Meteor.users.update(
      {_id: Meteor.userId()},
      {$addToSet: {favoriteSongs: songId}}
    );
    if (affected) { 
      Songs.update(songId, {$inc: {favorite_count: 1}});
      Meteor.call("addSongToFavorites", songId); 
    }
  },

  unfavoriteSong: function (songId) {
    var affected = Meteor.users.update(
      {_id: Meteor.userId()},
      {$pull: {favoriteSongs: songId}}
    );
    if (affected) { 
      Songs.update(songId, {$inc: {favorite_count: -1}});
      Meteor.call("deleteSongFromFavorites", songId);
    };
  },

  deleteSong: function (songId) {
  	if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var song = Songs.findOne(songId)
    if (Meteor.userId() == song.owner) {
      Songs.remove(songId);
    }
  },

});

if (Meteor.isClient) {
  Meteor.subscribe("songs");
  Meteor.subscribe("songCommentCount");
}

if (Meteor.isServer) {
  Meteor.publish("songs", function () {
    return Songs.find();
  });
}