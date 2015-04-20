/* 
John Stuart 
CSCI 578
Fall 2015	

This is the controller for logging in a User, currently it implements the loginUser function.
When the event representing the button click for logging in a user is received the loginUser function is run.
Upon completion the feed screen is invoked.

*/

// currently unused
var args = arguments[0] || {};

// function to login a user to the ACS cloud server
function onLogin(e) {
	// actual call to the ACS cloud server
	Cloud.Users.login({
    	login: $.loginUsername.value,
	    password: $.loginPassword.value
	// inline function to handle results of the login call
	}, function (e) {
    	if (e.success) {
        	username = e.users[0];
        	
        	// Toast to show success
        	Ti.UI.createNotification({
   				message: username.username +' logged in succesfully',
    			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
				}).show();
	   		loginView.close();
	   		feed();
	    } else {
	    	// alert to show failure
    	    alert('Error:\n' +
        	    ((e.error && e.message) || JSON.stringify(e)));
    	}
	});	
}

