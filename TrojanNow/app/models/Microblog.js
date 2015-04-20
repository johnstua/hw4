/*
 * This is the Model (Class) that defines the microBlog
 * Note that the Blog Array is also defined here as the collection of this microblog
 * This has to do with the way the Titanium system/backbone.js works, the actual class is created
 * from this script
 * 
 * properties:
 *   microBlog
 *   sensorData
 *   anonymous
 *   user
 *   targetUser  
 * 
 * Methods:
 *   getBlog()
 *   setBlog()
 *   getSensorData()
 *   setSensorData()
 *   getAnonymous()
 *   setAnonymous()
 *   getUser()
 *   setUser()
 *   getTargetUser()
 *   setTargetUser()
 * 
 * Methods for BlogArray
 *   getBlogs()
 *   addBlogs()
 *   clearBlogs()
 * 
 */


exports.definition = {
	config: {
		columns: {
		    "microBlog": "string",
		    "anonymous": "boolean",
		    "user": "string",
		    "targetUser": "string",
		    "sensorType": "integer",
		    "sensorValue": "integer"
		},
		adapter: {
			type: "sql",
			collection_name: "Microblog"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// get microblog information from model
		 	getBlog: function() {
    			return this.get("microBlog");
  			},
  			// set microblog information in model
  			setBlog: function(blog) {
  				this.set({microBlog: blog});
   			},
  			// get sensor information from model
  			getSensorValue: function() {
    			return this.get("sensorValue");
  			},
  			// set sensor information in model
  			setSensorValue: function(sensorData) {
    			this.set({sensorValue: sensorData});
   			},
   			// get sensor information from model
  			getSensorType: function() {
    			return this.get("sensorType");
  			},
  			// set sensor information in model
  			setSensorType: function(sensorData) {
    			this.set({sensorType: sensorData});
   			},
   			// get anonymous information from model
  			getAnonymous: function() {
    			return this.get("anonymous");
  			},
  			// set anonymous information in model
  			setAnonymous: function(anon) {
    			this.set({anonymous: anon});
   			},
   			// get user information from model
  			getUser: function() {
    			return this.get("user");
  			},
  			// set user information in model
  			setUser: function(user) {
    			this.set({user: user});
   			},
   			// get targetUser information from model
  			getTargetUser: function() {
    			return this.get("targetUser");
  			},
  			// set target User information in model
  			setTargetUser: function(target) {
				this.set({targetUser: target});
   	    		}
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			getBlog: function() {
    			Ti.API.info("TEST ME");
  			},
  			addBlogs: function() {
    			Ti.API.info("TEST ME");
  			},
  			clearBlogs: function() {
    			Ti.API.info("TEST ME");
  			},
  			
		});

		return Collection;
	}
};

