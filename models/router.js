Router.configure({
  loadingTemplate: 'loading',
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    if (this.route._path == '/policy') {
      this.next();
    } else {
      this.render('splash');
    }
    
  } else {
    soundManager.setup({
      debugMode:false,
      useConsole:false
    });

    //TODO: Better way to manage userFilter
    // Used to reset user filter
    Session.set("userFilter", "");
    this.next();
  }
});

// Route Home
Router.route('home', {
  path: '/',

  load: function() {
    Router.go('music');
  },
  waitOn: function() {
    
    return Meteor.subscribe('songs');

  },    
});


// User Routing
Router.route('/users/:_id', function () {
  var params = this.params;
  var id = params._id;
  this.render('header', {to: 'header'});
  this.render('user', {
    data: function () {
      //TODO: move this
      Session.set("subFilter", "music");
      Session.set("userFilter", "favorites");
      return Meteor.users.findOne({_id: this.params._id});
    }
  });
});


// User Routing
Router.route('/users/:_id/:tab', function () {
  var params = this.params;
  var id = params._id;
  var tab = params.tab;
  
  if (tab == "settings") {
    Session.set("userFilter", "settings");
  }
  if (tab == "uploaded") {
    Session.set("userFilter", "uploaded");
  }
  if (tab == "favorites") {
    Session.set("userFilter", "favorites");
  }

  this.render('header', {to: 'header'});
  this.render('user', {
    data: function () {
      //TODO: move this
      Session.set("subFilter", "music");
      return Meteor.users.findOne({_id: this.params._id});
    }
  });
});


// Misc. Pages
Router.route('about', {
  path: '/about', 
});

Router.route('policy', {
  path: '/policy', 
});


// Song Routing
Router.route('/:_sub/:_id', function () {
  
  var song = Songs.findOne({_id: this.params._id});
  var sub = this.params._sub;
  if (sub) {
    Session.set("subFilter", sub);
  }
  if (song) {
    Meteor.subscribe('postComments', song._id);
    Session.set("expandedSong", song);
    Drawer.show(song._id);
  }
  
  this.render('home');
  this.render('header', {to: 'header'});

});

// Song Routing
Router.route('users/:userId/:_sub/:_id/', function () {
  
  var song = Songs.findOne({_id: this.params._id});
  var sub = this.params._sub;
  if (sub) {
    Session.set("subFilter", sub);
  }
  if (song) {
    Meteor.subscribe('postComments', song._id);
    Session.set("expandedSong", song);
    Drawer.show(song._id);
  }
  
  this.render('user');
  this.render('header', {to: 'header'});

});


// Favorites filter
Router.route('favorites', function () { 
  Session.set("subFilter", 'favorites');
  this.render('home');
  this.render('header', {to: 'header'});
});

// Sub filters
Router.route('music', function () { 
  Session.set("subFilter", 'music');
  this.render('home');
  this.render('header', {to: 'header'});
});

Router.route('deep', function () { 
  Session.set("subFilter", 'deep');
  this.render('home');
  this.render('header', {to: 'header'});
});

Router.route('progressive', function () { 
  Session.set("subFilter", 'progressive');
  this.render('home');
  this.render('header', {to: 'header'});
});

Router.route('dub', function () { 
  Session.set("subFilter", 'dub');
  this.render('home');
  this.render('header', {to: 'header'});
});

Router.route('tropical', function () { 
  Session.set("subFilter", 'tropical');
  this.render('home');
  this.render('header', {to: 'header'});
});

Router.route('indie', function () { 
  Session.set("subFilter", 'indie');
  this.render('home');
  this.render('header', {to: 'header'});
});

Router.route('hiphop', function () { 
  Session.set("subFilter", 'hiphop');
  this.render('home');
  this.render('header', {to: 'header'});
});

Router.route('pop', function () { 
  Session.set("subFilter", 'pop');
  this.render('home');
  this.render('header', {to: 'header'});
});