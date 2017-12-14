myApp.controller('UserController', function(UserService, $http, $location, $mdDialog) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.testPlayer = {};
  vm.testEnemy = {};
  vm.statArray = buildNumberArray(17,25);
  vm.lvlArray = buildNumberArray(1,50);


  function buildNumberArray(min, max){
    // Builds arrays of numbers for things like stats and levels
    tempArray = [];
    for (var i = min; i <= max; i++) {
      tempArray.push(i);
    }
    return tempArray;
  }

  function determineOrder(player, enemy){
    // Determines who acts first
    playerAction(player, enemy);
  }

  function playerAction(player, enemy){
    // Player turn in battle
    enemy.hp -= 5;
    console.log('Player hits Enemy for 5 damage!');
    if(player.hp > 0 && enemy.hp > 0){
      enemyAction(player, enemy);
    }
    else{
      endBattle(player, enemy);
    }
  }

  function enemyAction(player, enemy){
    // Enemy turn in battle
    player.hp -= 5;
    console.log('Enemy hits Player for 5 damage!');
    if(player.hp > 0 && enemy.hp > 0){
      playerAction(player, enemy);
    }
    else{
      endBattle(player, enemy);
    }
  }

  function endBattle(player, enemy){
    // Battle conclusion
    if (player.hp <= 0 && enemy.hp <= 0) {
      console.log('Both combatants lie on the ground. The fight is a draw!');
    }
    else if (player.hp <= 0) {
      console.log('Enemy wins!');
    }
    else {
      console.log('Player wins!');
    }
  }

  vm.battle = function(player, enemy){
    console.log('in battle');
    vm.battleLog = [];
    determineOrder(player, enemy);


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
