// User on creation settings
Accounts.onCreateUser(function(options, user) {
  
  user.profile = {};
  user.favoriteSongs = [];
  user.role = 'user';

  if (typeof(user.services.facebook) != "undefined") {
        if (user.services.facebook.id) {
            user.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        } else {
             user.profile.picture = "/img/default-user-pic.png";
        }
        user.profile.name = user.services.facebook.name;
        user.profile.email = user.services.facebook.email;
  }

  sendSignUpEmail(user.profile.name, user.profile.email)

  return user;
});
