//public/core.js

//angular core
var takao = angular.module('takao', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','RedditEntries', function($scope, $http, RedditEntries) {
		$scope.loading = true;

		//Get all Reddit entries on load
		RedditEntries.get()
			.success(function(data) {
				$scope.redditEntries = data;
				$scope.loading = false;
			});

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteEntry = function(id) {
			$scope.loading = true;

			RedditEntries.delete(id)
				//on successful delete, get all entries again
				.success(function(data) {
					$scope.loading = false;
					$scope.redditEntries = data; // assign our new list of todos
				});
		};
	}]);
