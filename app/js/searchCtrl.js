dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.
	$scope.search = function(query) {
		$scope.loading = true;
		$scope.status = "Searching...";

		if (query !== "") {
			Dinner.DishSearch.get(
				{title_kw:query},
				function(data) {
				$scope.dishes = data.Results;
				$scope.loading = false;
				},
				function(data) {
				$scope.loading = false;
				$scope.error = true;
				$scope.status = "There was an error";
				}
			);
		}
		else {
			Dinner.DishSearch.get(
				function(data) {
				$scope.dishes = data.Results;
				$scope.loading = false;
				},
				function(data) {
				$scope.loading = false;
				$scope.error = true;
				$scope.status = "There was an error";
				}
			);
		}
		
		Dinner.DishSearch.get(
			{title_kw:query},
			function(data) {
				$scope.dishes = data.Results;
				$scope.loading = false;
			},
			function(data) {
				$scope.loading = false;
				$scope.error = true;
				$scope.status = "There was an error";
			}
		);
	}

	Dinner.setPendingPrice(0);
	$scope.search("");
	
});