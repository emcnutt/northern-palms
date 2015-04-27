Router.configure({
  loadingTemplate: 'loading',
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

// Route Home
Router.route('home', {
  path: '/', 
});

// Misc. Pages
Router.route('about', {
  path: '/about', 
});

Router.route('policy', {
  path: '/policy', 
});