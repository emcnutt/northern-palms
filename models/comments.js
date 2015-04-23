Comments = new Mongo.Collection("comments");
CommentUpvotes = new Mongo.Collection("commentUpvotes");

Meteor.methods({
		
});

Comments.allow({
  	insert: function (userId, doc) {
	    // the user must be logged in, and the document must be owned by the user
	    return (userId && doc.owner === userId);
    },
    update: function (userId, doc, fields, modifier) {
	    // can only change your own documents
	    return doc.owner === userId;
  	},
  	remove: function (userId, doc) {
    	// can only remove your own documents
    	return doc.owner === userId;
  	},
});

if (Meteor.isServer) {
    Meteor.publish('postComments', function(songId) {  
        return Comments.find({songId: songId});
    });
}