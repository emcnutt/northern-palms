// Send email to user after initial account creation
// name(string): name of new user
// email(string): email of new user
sendSignUpEmail = function(name, email) {

    Meteor.Mandrill.sendTemplate({
        "template_name": "sign-up-template",
        "template_content": [
          {}
        ],
        "message": {
            "merge_vars": [
                {
                    "vars": [
                        {
                            "name": "name",
                            "content": name
                        },
                    ]
                }
            ],
            "to": [
                {"email": email}
            ]
        }
    });
};