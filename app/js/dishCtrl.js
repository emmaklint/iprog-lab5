dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

	$scope.loading = false;
	var dish;

	$scope.search = function(dishID) {
		$scope.status = "Loading...";

		Dinner.Dish.get(
			{id:dishID},
			function(data) {
				$scope.dish = data;
				dish = data;
				Dinner.setPendingPrice(dish);
				$scope.status = "Showing dish";
				$scope.loading = true; 
			},
			function(data) {
				$scope.status = "There was an error";
			}
		);
	}

	$scope.search($routeParams.dishId);

	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}

	$scope.getDishPrice = function() {
	return Dinner.getDishPrice(dish)	}

	$scope.confirmDish = function(dish) {
		Dinner.addDishToMenu(dish);
	}
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  
});