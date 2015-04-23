Template.subheader.events({

    "click .sort-filter": function (event) {

        Session.set('sortFilter', event.target.name);
    },

    "click .mix-filter": function (event) {

        Session.set('mixFilter', event.target.name);
    },

});

Tracker.autorun(function () {
    
    // Sort Filtering
    var sortFilter = Session.get('sortFilter');
    var sortTarget = '.sort-filter[name='+sortFilter+']';
    $('.sort-filter').removeClass('selected');
    $(sortTarget).addClass('selected');

    // Mix Filtering
    var mixFilter = Session.get('mixFilter');
    var mixTarget = '.mix-filter[name='+mixFilter+']';
    $('.mix-filter').removeClass('selected');
    $(mixTarget).addClass('selected');

});