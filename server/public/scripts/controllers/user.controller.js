myApp.controller('UserController', function(UserService, $http, $location, $mdDialog) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.testPlayer = {name: "Player"};
  vm.testEnemy = {name: "Enemy"};
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

  function beginBattle(player, enemy){
    // Determines who acts first and begins battle
    playerAction(player, enemy);
  }

  function rollForHit(attacker, defender){
    // Determines if attacks hits
    for (var i = 0; i < attacker.numberOfAttacks; i++) {
        var attackRoll = Math.floor(Math.random()*100+1+attacker.lvl+attacker.dex-17);
        if (attackRoll >= defender.ac * 5) {
          var damageRoll = Math.floor(Math.random()*8+1) + attacker.lvl/2;
          defender.hp -= damageRoll;
          console.log(attacker.name + '\'s attack hits for ' + damageRoll + ' damage!');
        }
        else {
          console.log(attacker.name + '\'s attack goes wide!');

        }
    }
  }

  function playerAction(player, enemy){
    // Player turn in battle
    rollForHit(player, enemy);
    if(player.hp > 0 && enemy.hp > 0){
      enemyAction(player, enemy);
    }
    else{
      endBattle(player, enemy);
    }
  }

  function enemyAction(player, enemy){
    // Enemy turn in battle
    rollForHit(enemy, player);

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
    // checkStats - make sure everything was entered
    vm.battleLog = [];
    beginBattle(player, enemy);


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
