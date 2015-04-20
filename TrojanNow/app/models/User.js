/*
 * This is the Model (Class) that defines the User
 * 
 * it has one property
 * username which is a string
 */

exports.definition = {
	config: {
		columns: {
		    "username": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "User"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
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