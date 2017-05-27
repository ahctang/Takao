angular.module('takaoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','RedditEntries', function($scope, $http, RedditEntries) {
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		RedditEntries.get()
			.success(function(data) {
				$scope.RedditEntries = data;
				$scope.loading = false;
			});

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			RedditEntries.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					console.log(data);
					$scope.loading = false;
					$scope.RedditEntries = data; // assign our new list of todos
				});
		};
	}]);
