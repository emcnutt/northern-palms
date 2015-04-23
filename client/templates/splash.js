Template.splash.helpers({

});


Template.splash.events({

    "click .sign-in": function (event) {
        if(Meteor.Device.isPhone()) {
            Meteor.loginWithFacebook({ loginStyle: "redirect" });
        } else {
            Meteor.loginWithFacebook();
        }
    },

});


Template.splash.rendered = function () {

    $('.genre-filter-1').addClass('splash-animation');

    $('.genre-filter-1').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('.genre-filter-1').removeClass('splash-animation');
        $('.genre-filter-2').addClass('splash-animation');
    });

    $('.genre-filter-2').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('.genre-filter-2').removeClass('splash-animation');
        $('.genre-filter-3').addClass('splash-animation');
    });

    $('.genre-filter-3').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('.genre-filter-3').removeClass('splash-animation');
        $('.genre-filter-4').addClass('splash-animation');
    });

    $('.genre-filter-4').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('.genre-filter-4').removeClass('splash-animation');
        $('.genre-filter-5').addClass('splash-animation');
    });

    $('.genre-filter-5').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('.genre-filter-5').removeClass('splash-animation');
        $('.genre-filter-6').addClass('splash-animation');
    });

    $('.genre-filter-6').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('.genre-filter-6').removeClass('splash-animation');
        $('.genre-filter-7').addClass('splash-animation');
    });

    $('.genre-filter-7').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('.genre-filter-7').removeClass('splash-animation');
        $('.genre-filter-1').addClass('splash-animation');
    });

};