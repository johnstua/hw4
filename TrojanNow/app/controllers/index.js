/* 
John Stuart 
CSCI 578
Fall 2015	

This controller is the default Alloy implemented starting point, in this case it simply calls the login screen, 
The doClick is implemented, but not used in the normal execution of the app

*/

// this function curently does not get invoked as the index view is not shown to the user.
function doClick(e) {
    alert($.label.text);
}

// run the login screen upon startup
$.index.open();
login();
