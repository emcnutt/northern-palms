Template.comment.helpers({

  user: function(attr) {
    var owner = this.owner;
    var user = Meteor.users.findOne({_id: owner});
    if (attr == 'name') {
      return user.services.facebook.name;
    } 
    if (attr == 'pic') {
      return user.profile.facebook.name;
    }
  },

  date_posted: function() {
    var createdAt = this.createdAt;
    return moment(createdAt).fromNow();
  },

  show_delete: function() {
    var owner = this.owner;
    if (owner !== Meteor.userId()) {
      return 'hide'
    }  
  },

  profile_picture: function () {
    var expandedSong = Session.get("expandedSong");
    if (expandedSong) {
    var userId = expandedSong.owner;
      var user = Meteor.users.findOne({_id: userId});
      if (user.profile.picture) {
        return user.profile.picture;
      }
    }
  },

});

Template.comment.events({
  
  // Delete comment
  "click .delete-comment": function (event) {
    var ele = event.target;
    var container = ele.parentNode.parentElement;
    $(container).children().addClass('hidden');
    $(container).children('.delete-confirm').removeClass('hidden');
  },

  // Delete comment
  "click .delete-comment-confirm": function (event) {

    var affected = Comments.remove({_id: this._id});
    if (affected) { 
      Meteor.call('decreaseCommentCount', this.songId); 
    };

  },

  // Cancel comment deletion
  "click .delete-comment-cancel": function (event) {
    var ele = event.target;
    var container = ele.parentNode.parentElement;
    $(container).children().removeClass('hidden');
    $(container).children('.delete-confirm').addClass('hidden');
  },

});

Tracker.autorun(function () {
	
});