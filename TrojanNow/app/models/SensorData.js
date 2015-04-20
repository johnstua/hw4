/*
 * This is the Model (Class) that defines the SensorData
 * 
 * properties:
 *   sensorType
 *   sensorValue
 * 
 * Methods:
 *   getSensorType()
 *   setSensorType()
 *   getSensorValueArray()
 *   sense
 * 
 */

exports.definition = {
	config: {
		columns: {
		    "sensorType": "int",
		    "sensorValue": "int"
		},
		adapter: {
			type: "sql",
			collection_name: "SensorData"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// return sensor type
			getSensorType: function() {
    			return this.get("sensorType");
  			},
  			// set the sensor type
  			setSensorType: function(sType) {
  				this.set({sensorType: sType});
  			},
  			// get the sensor value
  			getSensorArray: function() {
    			return this.get("sensorValue");
  			},
  			// sense the value
  			sense: function() {
    			return this.get("sensorValue");
  			}  			  			
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};