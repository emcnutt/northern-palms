// Run on server startup
Meteor.startup(function () {

    // Configure Mandrill settings
    if(process.env.NODE_ENV == "production"){
      return Meteor.Mandrill.config({
          username: "support@partying.to",
          key: "-tQoTtwThHRIYWGBvPRYpg"
      });
    } else {
      return Meteor.Mandrill.config({
          username: "support@partying.to",
          key: "HMZJFxliZJM537YfVyer8g"
      });
    }

    // Start future cron tasks
    // FutureTasks.find().forEach(function(mail) {
    //   if (mail.date < new Date()) {
    //     sendMail(mail)
    //   } else {
    //     addTask(mail._id, mail);
    //   }
    // });
    // SyncedCron.start();

});


// Redirect all subdomain to naked domain on production environment
if (process.env.NODE_ENV == "production") {
  WebApp.connectHandlers
    .use(function(req, res, next) {
      if (req.headers.host !== 'partying.to') {
        res.writeHead(301, {
          'Location': 'http://partying.to' + req.originalUrl
        });
        res.end();
      } else {
        next();
      }
    });
}
