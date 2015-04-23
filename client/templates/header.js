Template.header.rendered = function () {
  
};

Template.header.helpers({

    username: function () {
        var user = Meteor.user();
        if (user.services.facebook) {
            return user.services.facebook.name;
        }
    },

    profile_picture: function () {
        var user = Meteor.user();
        if (user.profile.picture) {
            return user.profile.picture;
        }
    },

    sub_filter: function () {
        var sub = Session.get('subFilter');
        if (sub) {
            return sub;
        }

    },

});

Template.header.events({

    // Hide the top header banner
    "click .header-banner-close": function (event) {
        
        Session.set('headerBannerHidden', true);

    },

    "click .sub-filter": function (event) {

        event.stopPropagation();
        $('.dd-sub').removeClass('hidden');
        $('.sub-filter').addClass('menu-open');

    },

    "click .sub-filter-link": function (event) {
        
        $('.dd-sub').addClass('hidden');
        $('.sub-filter').removeClass('menu-open');

    },

    "click .user-settings": function (event) {

        event.stopPropagation();
        $('.dd-user').removeClass('hidden');

    },

    "click .menu-mobile": function (event) {

        event.stopPropagation();
        $('.dd-user').removeClass('hidden');

    },

    "click .sign-out-link": function (event) {

        Meteor.logout();

    },

    "click .add-song": function (event) {

        showAddSong();
        
        return false;

    },

    "click .add-song-link": function (event) {

        showAddSong();
        
        return false;

    },

    "click .profile-link": function (event) {

        var id = Meteor.userId();
        Router.go('/users/' + id);

    },

    "click .settings-link": function (event) {

        var id = Meteor.userId();
        Router.go('/users/' + id + '/settings');

    },

    "submit .add-song-active": function (event) {

        var text = event.target.text.value;
        var track;
        
        //SC.get("/tracks/" + text, function(resp){
        SC.get('/resolve/?url=' + text, {limit: 1}, function(resp){
          if (resp.errors) {

          } else {
            track = resp;
            
            Meteor.call("addSong", track, 'deep', 'soundcloud');

            event.target.text.value = "";

            $('#add-song').removeClass('add-song-active');
            $('.add-btn-text').removeClass('hide');
          }
        });
        return false;
    },

});

Tracker.autorun(function () {

  var headerBannerHidden = Session.get("headerBannerHidden");

  if (headerBannerHidden == true) {
    $('.header-banner').addClass('hidden');
  }

});