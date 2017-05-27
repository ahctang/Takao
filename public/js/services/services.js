angular.module('takaoService', [])

	// super simple service
	// each function returns a promise object
	.factory('RedditEntries', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/getAllEntries');
			},
			delete : function(id) {
				return $http.delete('/api/deleteEntry/' + id);
			}
		}
	}]);
