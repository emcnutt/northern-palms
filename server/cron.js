// FutureTasks = new Meteor.Collection('future_tasks');

// // Add a task to the cron job
// // id (string) = id of cron job
// // type (string) = email
// // interval (string) = interval of how often the synced job should run on schedule

// addTask = function(id, type, date, details) {

//     SyncedCron.add({
//         name: id,
//         schedule: function(parser) {
//             return parser.recur().on(details.date).fullDate();
//         },
//         job: function() {
//             sendMail(details);
//             FutureTasks.remove(id);
//             SyncedCron.remove(id);
//                 return id;
//         }
//     });

// }

// // In this case, "details" should be an object containing a date, plus required e-mail details (recipient, content, etc.)
// sendMail = function(details) {

//     Meteor.Mandrill.sendTemplate({
//         "key": "YOUR_MANDRILL_API_KEY", // optional, if you set it in with Meteor.Mandril.config() already
//         "template_name": "YOUR_TEMPLATE_SLUG_NAME",
//         "template_content": [
//           {}
//         ],
//         "message": {
//             "global_merge_vars": [
//                 {
//                     "name": "var1",
//                     "content": "Global Value 1"
//                 }
//             ],
//             "merge_vars": [
//                 {
//                     "rcpt": "email@example.com",
//                     "vars": [
//                         {
//                             "name": "fname",
//                             "content": "John"
//                         },
//                         {
//                             "name": "lname",
//                             "content": "Smith"
//                         }
//                     ]
//                 }
//             ],
//             "to": [
//                 {"email": "email@example.com"}
//             ]
//         }
//     });
// }

// scheduleMail = function(details) { 

//     if (details.date < new Date()) {
//         sendMail(details);
//     } else {
//         var thisId = FutureTasks.insert(details);
//         addTask(thisId, details);       
//     }
//     return true;

// }