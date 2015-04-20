/*
  	John Stuart 
	CSCI 578
	Fall 2015
 */

// The contents of this file will be executed before any 
// views or controllers are ever executed, including the index.
//
// application initialization
// global variables/functions


// Require sensor module found here https://github.com/GeraudBourdin/ti_sensor
// This module is compiled no source code is included in this project
var sensor = require('com.geraudbourdin.sensor');
var sensorList = sensor.getSensorList(sensor.TYPE_ALL);


// Enumeration for SensorType used in the Microblog Model
SensorType = {
    LightSensor : sensor.TYPE_LIGHT, // 5
    Temperature : sensor.TYPE_AMBIENT_TEMPERATURE,  // 13
};

// debug for testing
Ti.API.info("Light => " + SensorType.LightSensor);
Ti.API.info("Temperature => " + SensorType.Temperature);

// global used in feed view/controller
var postsToView = 10;  // default to 10 posts

// globals used in the Microblog model
var username; 
var blogPost;

// this is the Blog Array, it is a class instance of an array of Blogs 
var blogs = Alloy.Collections.instance('Microblog');

// code to test the SensorData Model left in for debug
var sData = Alloy.Models.instance('SensorData');
sData.setSensorType(7);
Ti.API.info(sData.getSensorType());
Ti.API.info(sData.getSensorArray());
Ti.API.info(sData.sense());

// code to test the MicroBlog Model  left in for debug
var mBlog = Alloy.Models.instance('Microblog');
mBlog.setBlog("Blog");
Ti.API.info(mBlog.getBlog());
mBlog.setSensorType(10);
Ti.API.info(mBlog.getSensorType());
mBlog.setSensorValue(100);
Ti.API.info(mBlog.getSensorValue());
mBlog.setAnonymous(true);
Ti.API.info(mBlog.getAnonymous());
mBlog.setUser("User");
Ti.API.info(mBlog.getUser());
mBlog.setTargetUser("TargetUser");
Ti.API.info(mBlog.getTargetUser());

// DEBUG information, this section is for use in testing with new devices
// Left in for debug purposes, if this was a real application it would be removed 
// Begin


// send sensor data to the console for debugging
Ti.API.info("sensorlist is => " + sensorList);
Ti.API.info("sensorlist typeof is => " + typeof sensorList);
Ti.API.info("----------------------------------------");

// for each item in the sensor list
for (item in sensorList)
	{
	// list the info	
	Ti.API.info("item is => " + item);	
	Ti.API.info("[item] is => " + sensorList[item]);	
	}
	Ti.API.info("items => " + sensorList.length);	

for (item in sensorList)
	{
    //return array  : 
    var infos = sensor.getSensorInfos(sensorList[item]);
    var sensorInfo;
    sensorInfo = "type: " + sensorList[item] +"\n"; 
    sensorInfo += "name: "+ infos['name'] +"\n";
    sensorInfo += "constant: "+ infos['constant'] +"\n";
    sensorInfo +=  "version: "+ infos['version'] +"\n";
    sensorInfo += "resolution: "+ infos['resolution'] +"\n";
    sensorInfo += "power: "+ infos['power'] +"\n";
    sensorInfo += "vendor: "+ infos['vendor'] +"\n";
    sensorInfo += "maximumRange: "+ infos['maximumRange'] +"\n";
    sensorInfo += "minDelay: "+ infos['minDelay'] +"\n";
    
	Ti.API.info(sensorInfo);
	Ti.API.info("----------------------------------------");
	}

// End debug data for new devices

// Reauire Titanium APS services 
var Cloud = require("ti.cloud");


// Helper functions
// these functions are scoped here as to be globally accessable, they are used to open the views
// by scoping them globally they can be used by any controller to bring focus into another view


// open addUser view
var addUserView;
function addUser(event) {
	// clear all screens
	clearViews();

   	addUserView = Alloy.createController("addUser").getView();
    addUserView.open();
}   

// open feed view
var feedView;
function feed(event) {
   	// clear all screens
	clearViews();

   	feedView = Alloy.createController("feed").getView();
    feedView.open();
}   

// open login view
var loginView;
function login(event) {
   	// clear all screens
	clearViews();

   	loginView = Alloy.createController("login").getView();
    loginView.open();
}   

// open post view
var postView;
function post(event) {
   	// clear all screens
	clearViews();

   	postView = Alloy.createController("post").getView();
    postView.open();
}   

function clearViews()
	{
	if (addUserView)
		addUserView.close();
	if (feedView)
		feedView.close();
	if (loginView)
		loginView.close();
	if (postView)
		postView.close();
	}


// perform logout
function onLogout(event) {
 Cloud.Users.logout(function (e) {
    if (e.success) {
    	
    	// toast to display success
    	Ti.UI.createNotification({
   		message: 'Logged out succesfully',
    	duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		}).show();
        
    } else {
    	// alert to show error
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
}); 

// go to the login screen
login();
} 



// launch the login page
login();

