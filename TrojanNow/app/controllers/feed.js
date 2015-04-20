/* 
John Stuart 
CSCI 578
Fall 2015	

This controller implements the getFeed listener, when the appropriate event is sent the function 
will retrieve the feed items and display them to the end user

*/

// not currently used
var args = arguments[0] || {};

// responds to button pressed event, adds 10 to the number of blogs to retrieve, then retrieves them
function moreFeed()
	{
		postsToView += 10;	
		onRequestBlogs();
	}

		
// function to retrieve the latest posts from the Server and display them on the feed screen
function onRequestBlogs(e) 
	{
	// clear the view
	if ($.feedView.children) {
        for (var child = $.feedView.children.length; child > 0; child--){
            $.feedView.remove($.feedView.children[child-1]);
        	}
    	}
		
	// query the server for one page of up to 10 posts
	Cloud.Posts.query({
	    page: 1,
	    per_page: postsToView,
	    where: {"targetUser": {"$in":["",username.username]}}	
	// embedded function to handle the results of the query    
	}, function (e) {
	    if (e.success) {
	    	// for each post
	        for (var i = 0; i < e.posts.length; i++) {
	            var post = e.posts[i];
	        
	    	var writtenBy = ''; // blank for Anonymous
	        if (post.custom_fields.user != 'Anonymous') {
	        	writtenBy = ' written by: ' + post.custom_fields.user + ',';
	       		}
	       	
	       	sensorInfo = ''; // blank if not supported or used in this post
	       	if (post.custom_fields.sensorType == sensor.TYPE_AMBIANT_TEMPERATURE){
	       		sensorInfo = "Temperature: " + post.custom_fields.sensorValue + '\n';
	       	}

	       	if (post.custom_fields.sensorType == sensor.TYPE_LIGHT){
	       		sensorInfo = "Light Level: " + post.custom_fields.sensorValue + '\n';
	       	}
			// time post was updated
			updated = new Date(post.updated_at);

	        // create a label variable for the post    
	        var labelText = 
	                post.content + '\n' +
					sensorInfo +
					writtenBy +
					' posted: ' + updated.toLocaleDateString() + ' ';
	         
	        
	        // create the label using the variable created, with some extra formatting
	        if (post.custom_fields.targetUser == username.username)
	        	labelColor = "#800";
	        else 
	        	labelColor = "#000";
	        var label1 = Ti.UI.createLabel({
				color: labelColor,
  				font: { fontSize:10 },
  				text: labelText,
  				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  				top: 30,
  				border: '3px',
  				borderColor: "#888",
  				width: Ti.UI.SIZE, height: Ti.UI.SIZE
				});
			// add the view to the view
			$.feedView.add(label1);
	        
	        
	        }
	    } else {
	    	// alert on error
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

// upon instantiation of the feed run the getFeed method
onRequestBlogs();
