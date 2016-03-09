// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {  

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'sV1fPGQKrO0b6oUYb6w9kLI8BORLiWox'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'sV1fPGQKrO0b6oUYb6w9kLI8BORLiWox'});

  if ($cookieStore.get('numberOfGuests')) {
    this.numberOfGuests = $cookieStore.get('numberOfGuests');
  }
  else {
    this.numberOfGuests = 2;
  }

  // var menu = [];
  if ($cookieStore.get('menu')) {
    var menu = [];
    var recipeIDs = $cookieStore.get('menu');
    
    for (var i in recipeIDs){
      this.Dish.get(
      {id:recipeIDs[i]},
      function(data) {
      menu.push(data);
        }
    )}; 
  } else {
    var menu = [];
  }




// whenever you are changing the number of guests or menu you also store those values to the $cookieStore
// you load the values from the cookie store the first time you create the variables that store your number of guest and menu
// The only tricky part here is that there is limit to how much information can be stored in a one cookie. Therefore, if you 
// your menu variable contains the full dish object (instead of just RecipeID) you will not be able to directly save that variable
//  in the cookie, but you will instead need to save only the IDs. 
  
  this.setNumberOfGuests = function(num) {
    this.numberOfGuests = num;
    $cookieStore.put('numberOfGuests', num);
  }

this.getNumberOfGuests = function() {
    return this.numberOfGuests;
  }

  this.setPendingPrice = function(dish) {
    if (dish === 0) {
      this.pendingPrice = 0;
    } else {
      this.pendingPrice = this.getDishPrice(dish);
    }
  }

  this.getPendingPrice = function() {
    return this.pendingPrice;
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    return menu;
  }

  this.getDishPrice = function(dish) {
    
    var price = 0;

    for (var i=0; i < dish.Ingredients.length; i++) {
      var data = dish.Ingredients[i].Quantity;
      if (data = parseInt(data)) {
        price += (data * this.numberOfGuests);
      }
    }

    return price
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var cost = 0
    for(var i=0; i < menu.length; i++) {
      cost = cost + this.getDishPrice(menu[i]);
  
    }

    return cost;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(dish) {
    // var addDish = dish;
    // for (var i = 0; i < menu.length; i++) {
    //   var menuDish = menu[i];
    //   if (addDish.Category == menuDish.Category) {
    //     console.log('same!')
    //     this.removeDishFromMenu(menuDish);
    //   }
    // }

    menu.push(dish);

    addMenu = [];
    for (var i in menu) {
      addMenu.push(menu[i].RecipeID)
    }
    $cookieStore.put('menu', addMenu);
    console.log($cookieStore.get('menu'))

  }

  //Removes dish from menu
  this.removeDishFromMenu = function(removeDish) {
    var index = menu.indexOf(removeDish);
    menu.splice(index);
    console.log('delete' + removeDish.RecipeID)

    removeMenu = [];
    for (var i in menu) {
      removeMenu.push(menu[i].RecipeID)

    }

    $cookieStore.put('menu', removeMenu)

  }




  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});