/* 
John Stuart 
CSCI 578
Fall 2015	

This controller is responsible for posting data to the server, when it receives a post event it sends the data to the server for 
storing using the post function below

*/

// currently not used
var args = arguments[0] || {};

// variable declaration
var lightValue;
var temperatureValue;

// sensorsCallback is the listner that waits for events related to the sensor
var sensorsCallback = function(e) {
    if(e.sType == sensor.TYPE_LIGHT){
        // when the light sensor changes, update the value on the view
        $.postLight.title="Post Light Value? : "+e.lux;
        lightValue = e.lux;
    }

    if(e.sType == sensor.TYPE_AMBIANT_TEMPERATURE){
        // when the temperature sensor changes, update the value on the view
        $.postTemperature.title="Post Temperature Value? : "+e.fahrenheit;
        temperatureValue = e.fahrenheit;
    }
};

// get a list of sensors on the device
var sensorList = sensor.getSensorList(sensor.TYPE_ALL);
Ti.API.info("sensorlist is => " + sensorList);
Ti.API.info("----------------------------------------");

for (i in sensorList){
	// skip sensors that are not fully defined
    if( typeof sensorList[i] === 'undefined' ){
        continue;
    }
   
    if(sensorList[i] == sensor.TYPE_LIGHT){
    	// if there is a valid light sensor enable the sensor
        sensor.setSensor(sensor.TYPE_LIGHT);
    	$.postLight.enabled="true"; 
    	}    
    
    if(sensorList[i] == sensor.TYPE__AMBIANT_TEMPERATURE){
    	// if there is a valid temperature sensor enable the sensor
        sensor.setSensor(sensor.TYPE__AMBIANT_TEMPERATURE);
        $.postTemperature.enabled="true";
        }


    if((sensorList[i] == sensor.TYPE__AMBIANT_TEMPERATURE)||(sensorList[i] == sensor.TYPE_LIGHT)){      
        // If either or both sensors are available setup the listener to listen for events
        sensor.addEventListener('update', sensorsCallback);
        }
    }

// when the window opens add the event listener
$.postWindow.addEventListener('open', function(e) {
    sensor.addEventListener('update', sensorsCallback);
});

// when the window closes remove the event listener
$.postWindow.addEventListener('close', function() {
    sensor.removeEventListener('update', sensorsCallback);
    $.destroy();
});

// when the window pauses remove the event listener
$.postWindow.addEventListener('pause', function(e) {
    sensor.removeEventListener('update', sensorsCallback);
});

// when the window resumes add the event listener
$.postWindow.addEventListener('resume', function(e) {
    sensor.addEventListener('update', sensorsCallback);
});


// method to post to the ACS Server 
function onSubmitBlog(e) {

	// determine the value of anonymous
	var anon = false;
   	if ($.postAnonymous.value)
   		anon = true;
   		
   		// display for debugging 
   		/*Ti.UI.createNotification({
   			message: ''+anon,
    		duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		}).show(); 
  		*/
  
   //  determine if there is a valid sensor selected 
	var sensorValue = 0;
	var sensorType = -1;
	
	// light
   	if ($.postLight.value){
   		sensorValue = lightValue;
   		sensorType = SensorType.LightSensor;
   		
   		// display for debugging, left in to enhance the demonstration
   		Ti.UI.createNotification({
   			message: 'The Ambiant Light is: '+lightValue,
    		duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		}).show(); 
		}
	// temperature		
	if ($.postTemperature.value){
   		sensorValue = temperatureValue;
   		sensorType = SensorType.Temperature;

   		// display for debugging, left in to enhance the demonstration   		
   		Ti.UI.createNotification({
   			message: 'The Ambiant Temperature is: '+temperatureValue,
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		}).show(); 
		}		
			
	// Create a model with the data from the screen
	 	blogPost = Alloy.createModel('Microblog', {
		microBlog: $.postContent.value, 
		sensorType: sensorType, 
		sensorValue: sensorValue, 
		user: username.username, 
		targetUser: $.postTargetUser.value
		}); 

	if (anon) {
		blogPost.attributes.user = "Anonymous";
	}
	
	// ACS function to create a post from the blog model
	Cloud.Posts.create({
	    content: blogPost.attributes.microBlog,
	   	custom_fields: {
        	user: blogPost.getUser(),
        	targetUser: blogPost.getTargetUser(),
        	anonymous: blogPost.getAnonymous(),
        	sensorType: blogPost.getSensorType(),
  			sensorValue: blogPost.getSensorValue()
			}
	    
	    // inline function to deal with results of Posts.create function
		}, function (e) {
	    if (e.success) {
	        var post = e.posts[0];
	        // alert to show success, need to replace with a toast
	       
	       	// Toast to show success
	    	var toastMsg = 
	    	Ti.UI.createNotification({
	   			message: 'Success:\n' +
	            'id: ' + post.id + '\n' +
	            'content: ' + post.content + '\n' +
	            'updated_at: ' + post.updated_at,
	    		duration: Ti.UI.NOTIFICATION_DURATION_SHORT
				}).show(); 
	        
	    } else {
	    	// alert to show failure
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
		
	});
// go to the feed view
feed();
}
