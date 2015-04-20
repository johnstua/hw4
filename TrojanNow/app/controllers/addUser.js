/* 
John Stuart 
CSCI 578
Fall 2015	

This is the controller for Adding a User, currently it implements the createUser function.
When the event representing the button click for Creating a user is received the creatUser function is run.
Upon completion the feed screen is invoked.


*/
// not currently used
var args = arguments[0] || {};


// Function to create a user using the values from the cooresponding view.
function onSignup(e) {
	// set variables
	Ti.API.info("username => " + $.addUsername.value);
    Ti.API.info("password => " + $.addPassword.value);
    
    // call APS function to create a user on the Server
    Cloud.Users.create({
        username : $.addUsername.value,
        password : $.addPassword.value,
        password_confirmation : $.addPasswordConfirm.value
    }, function(e) {
        if (e.success) {
   	        // display a toast to show success
   	        Ti.UI.createNotification({
   				message: e.users[0].username + " is logged in.",
    			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
				}).show();
   			username=e.users[0].username;
   			addUserView.close();
   			feed();
        } else {
        	// alert on error
            alert("Error: " + e.message);
        addUser();
        }
    });
 
}

