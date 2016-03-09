dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {

$scope.loading = false;

$scope.menu = function() {
	$scope.status = "Loading...";
	menu = Dinner.getFullMenu();
	$scope.menu = menu;
	$scope.loading = true;
}

$scope.getDishPrice = function(dish) {
	return Dinner.getDishPrice(dish);
}

$scope.getNumberOfGuests = function() {
	return Dinner.getNumberOfGuests();
}

$scope.getTotalMenuPrice = function() {
	return Dinner.getTotalMenuPrice();
}

$scope.menu();

});