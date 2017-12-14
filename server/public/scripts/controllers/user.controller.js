myApp.controller('UserController', function(UserService, $http, $location, $mdDialog) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.testPlayer = {};
  vm.testEnemy = {};
  vm.statArray = buildNumberArray(17,25);
  vm.lvlArray = buildNumberArray(1,50);


  function buildNumberArray(min, max){
    // builds arrays of numbers for things like stats and levels
    tempArray = [];
    for (var i = min; i <= max; i++) {
      tempArray.push(i);
    }
    return tempArray;
  }

  vm.battle = function(){
    console.log('in battle');
  };

  vm.hpInputPlaceholder = function(character){
    if(!isNaN(character.lvl * (10+(character.con-17)) + 30)) {
      if (!character.hpSet) {
        character.hp = character.lvl * (10+(character.con-17)) + 30;
        character.hpSet = true;
      }
      return character.lvl * (10+(character.con-17)) + 30;
    }
    else {
      return "---";
    }
  };


  vm.test = function(){
    console.log('in test');
    console.log('Player:', vm.testPlayer);
    console.log('Enemy', vm.testEnemy);
  };


}); // end controller
