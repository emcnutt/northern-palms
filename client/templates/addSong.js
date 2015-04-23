Template.addSong.rendered = function () {
  Session.set("uploadedSong", null);
};

Template.addSong.helpers({

  song_title: function () {
	 
   var uploadedSong = Session.get("uploadedSong");
   if (uploadedSong) {
    return uploadedSong.title;
   }
  },

  song_artist: function () {
   
   var uploadedSong = Session.get("uploadedSong");
   if (uploadedSong) {
    return uploadedSong.user.username;
   }
  },

  song_image: function () {
   
    var uploadedSong = Session.get("uploadedSong");
    if (uploadedSong) {
      url = uploadedSong.artwork_url;
      
      if(url) {
        url = url.replace('large','t300x300');
        return url;
      } else {
        return '/img/default-song-pic-1.png';
      }
    }
  }

});

Template.addSong.events({

  // Close drawer
  "click #addSong-close": function (event) {

    hideAddSong();

  },

  "click .existing-song": function (event) {

    hideAddSong();

  },

  // Close drawer by clicking on background hover
  "click #addSong-overlay": function (event) {
    hideAddSong();

  },

  // Add Soundcloud Song
  "submit #form-soundcloud-upload": function (event) {

    event.preventDefault();

    $('#form-soundcloud-upload').addClass('hide');
    $('.form-upload-loading').removeClass('hide');
    $('.form-msg').addClass('hide');

    var text = event.target[0].value;
    var track;
    
    //SC.get("/tracks/" + text, function(resp){
    SC.get('/resolve/?url=' + text, {limit: 1}, function(resp){
      if (resp.errors) {
        
        if(resp.errors[0].error_message == "404 - Not Found") {
          $('.form-upload-loading').addClass('hide');
          $('#form-soundcloud-upload').removeClass('hide');
          event.target[0].value = "";
          showFormMessage('form-soundcloud-upload', "Sorry, that soundcloud song url is invalid", 'error');
        }

      } else {
        track = resp;

        // Throw error if song has already been added to Songs collection
        existingSong = Songs.findOne({"track.id": track.id});
        if (existingSong) {
          $('.form-upload-loading').addClass('hide');
          $('#form-soundcloud-upload').removeClass('hide');
          event.target[0].value = "";
          var existingUrl = Router.current().url + '/' + existingSong._id;
          showFormMessage('form-soundcloud-upload', 'This song has already been uploaded. Check it out <a class="existing-song" href="' + existingUrl + '">here</a>');
          return false;
        }

        // Throw error is uploaded url is actually a playlist
        if (track.kind == "playlist") {
          $('.form-upload-loading').addClass('hide');
          $('#form-soundcloud-upload').removeClass('hide');
          showFormMessage('form-soundcloud-upload', "Sorry, we currently don't support uploading sets. Please add one song at a time.", 'error');
          event.target[0].value = "";
          return false;
        }

        // Throw error is uploaded url is not a track
        if (track.kind !== "track") {
          $('.form-upload-loading').addClass('hide');
          $('#form-soundcloud-upload').removeClass('hide');
          showFormMessage('form-soundcloud-upload', "Sorry, that soundcloud song url is invalid", 'error');
          event.target[0].value = "";
          return false;
        } 

        // Throw error if song cannot be streamed
        if (track.streamable == false) {
          $('.form-upload-loading').addClass('hide');
          $('#form-soundcloud-upload').removeClass('hide');
          showFormMessage('form-soundcloud-upload', "Sorry, Soundcloud doesn't allow streaming of this song", 'error');
          event.target[0].value = "";
        } else {
          
          $('.form-upload-loading').addClass('hide');
          $('#form-song-upload').removeClass('hide');
          
          Session.set("uploadedSong", track);

          var subFilter = Session.get("subFilter");
          if (subFilter) {
            var subSelection = '#sub-' + subFilter;
            $(subSelection).prop('checked', true);
          }

          var duration = track.duration;
          if (duration > 600000) {
            $('#song-upload-mix').prop("checked", true);
          };

        
        }
        event.target[0].value = "";
      }
    });
    
    return false;
  },

  // Upload Song
  "submit #form-song-upload": function (event) {

    event.preventDefault();

    var checkedSubs = [];
    var track = Session.get("uploadedSong");

    var subs = $('input[name="song-sub"]');
    for (var i = 0 ; i < subs.length ; i++) {
      if (subs[i].checked == true) {
        checkedSubs.push(subs[i].value);
      } 
    }

    var songType = $('input[name="song-type"]');
    for (var i = 0 ; i < songType.length ; i++) {
      if (songType[i].checked == true) {
        songType = songType[i].value;
      } 
    }

    if (checkedSubs.length == 0) {
       showFormMessage('form-song-upload', "Please select one or more subs", 'error');
    } else {

      var data = {
        track: track,
        title: track.title,
        artist: track.user.username,
        remix_artist: null,
        type: songType, // or 'mix' or 'remix'
        genres: [],
        subs: checkedSubs,
        source: 'soundcloud', 
      };
      
      Meteor.call("addSong", data);

      hideAddSong();

    }

    return false;
  },

});



Tracker.autorun(function () {
	
});