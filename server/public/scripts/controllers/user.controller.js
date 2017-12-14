myApp.controller('UserController', function(UserService, $http, $location, $mdDialog) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.testPlayer = {};
  vm.testEnemy = {};
  vm.statArray = buildNumberArray(17,25);
  vm.lvlArray = buildNumberArray(1,50);


function buildNumberArray(min, max){
    tempArray = [];
    for (var i = min; i <= max; i++) {
      tempArray.push(i);
    }
    return tempArray;
  }

  vm.test = function(){
    console.log('in test');
    console.log(vm.testPlayer);
  };
});
