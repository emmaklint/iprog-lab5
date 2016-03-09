dinnerPlannerApp.controller('PreparationCtrl', function ($scope,Dinner) {

$scope.loading = false;

$scope.menu = function() {
	$scope.status = "Loading...";
	menu = Dinner.getFullMenu();
	$scope.menu = menu;
	$scope.loading = true;
}


$scope.getNumberOfGuests = function() {
	return Dinner.getNumberOfGuests();
}

$scope.getMenuPrice = function() {
	return Dinner.getTotalMenuPrice();
}

$scope.menu();

});