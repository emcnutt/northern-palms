// Provide defaults for Meteor.settings

if (typeof Meteor.settings === 'undefined')
  Meteor.settings = {};

if (process.env.NODE_ENV == "production") {
  _.defaults(Meteor.settings, {
    facebook: {
      appId: "926486834043068", 
      secret: "ffec75f93d44e774de1c7d84275dc5d7"
    },
    soundcloud: {
      clientId: "71eb94f201e6b8df2e56c9eaa6f90fc1", 
      secret: "bfb2d0cc2bead3376dadbb3f173b6e8f"
    }
  });
} else {
  _.defaults(Meteor.settings, {
    facebook: {
      appId: "926489080709510", 
      secret: "87f52ba9af3adbb57b42a84b863de4b8"
    },
    soundcloud: {
      clientId: "71eb94f201e6b8df2e56c9eaa6f90fc1", 
      secret: "bfb2d0cc2bead3376dadbb3f173b6e8f"
    }
  });
}

ServiceConfiguration.configurations.remove({
  service: "facebook"
});
ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: Meteor.settings.facebook.appId,
  secret: Meteor.settings.facebook.secret
});

ServiceConfiguration.configurations.remove({
  service: "soundcloud"
});
ServiceConfiguration.configurations.insert({
  service: "soundcloud",
  clientId: Meteor.settings.soundcloud.clientId,
  secret: Meteor.settings.soundcloud.secret
});