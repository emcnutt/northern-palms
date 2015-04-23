if (Meteor.isServer) {

  // Publish the user directory which everbody can see
  Meteor.publish("userData", function () {
    if (this.userId) {
      return Meteor.users.find({}, {fields: {
        '_id': 1,
        'services': 1,
        'favoriteSongs': 1,
        'profile':1
      }});
    } else {
      this.ready();
    }
  });

}

if (Meteor.isClient) {
  Meteor.subscribe("userData");
}