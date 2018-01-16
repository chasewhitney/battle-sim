myApp.controller('UserController', function(UserService, $http, $location, $mdDialog, $timeout) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.testPlayer = {name: "Player"};
  vm.testEnemy = {name: "Enemy"};
  vm.statArray = buildNumberArray(17,25);
  vm.lvlArray = buildNumberArray(1,50);
  vm.tempActions = []; /// temp

  tempSkillHeavy = {name: "Heavy Strike", damage: 10, hitMod: -25}; /// temp
  tempSkillLight = {name: "Quick Strike", damage: 5, hitmod: 0}; /// temp

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
        var attackRoll = Math.floor(Math.random()*100+1); /// temp
        var battleLogEntry;
        if (attackRoll >= defender.ac * 5) { /// temp
          console.log('hit:' + attackRoll + 'vs' + (defender.ac * 5));
          rollForDamage(attacker, defender);
          // console.log(attacker.name + '\'s attack hits for ' + damageRoll + ' damage!');
        }
        else {
          battleLogEntry = attacker.name + '\'s attack misses.';
          console.log('miss:' + attackRoll + 'vs' + (defender.ac * 5));
          // console.log(attacker.name + '\'s attack goes wide!');
          console.log(battleLogEntry);
          vm.battleLog.push(battleLogEntry);

        }

    }
  }

  function rollForDamage(attacker, defender){
    // Determines damage
    var battleLogEntry;
    var numDice = 1; /// temp
    var diceSides = 8; /// temp
    var damageRoll = numDice * Math.floor(Math.random()*diceSides+1); /// temp
    /// possible damage mitigation
    defender.hp -= damageRoll;
    battleLogEntry = attacker.name + '\'s attack hits for ' + damageRoll + ' damage.';
    console.log(battleLogEntry);
    vm.battleLog.push(battleLogEntry);
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
$timeout(function(){if(player.hp > 0 && enemy.hp > 0){
  playerAction(player, enemy);
}
else{
  endBattle(player, enemy);
}},1000);
    // if(player.hp > 0 && enemy.hp > 0){
    //   playerAction(player, enemy);
    // }
    // else{
    //   endBattle(player, enemy);
    // }
  }

  function endBattle(player, enemy){
    // Battle conclusion
    if (player.hp <= 0 && enemy.hp <= 0) {
      console.log('The fight is a draw.');
    }
    else if (player.hp <= 0) {
      console.log('Enemy wins.');
      vm.testEnemy.wins = true;
      vm.battleLog.push('Enemy wins.');
    }
    else {
      console.log('Player wins.');
      vm.testPlayer.wins = true;
      vm.battleLog.push('Player wins.');
    }
    console.log('battleLog is:', vm.battleLog);
  }

  vm.battle = function(player, enemy){
    console.log('in battle');
    // checkStats - make sure everything was entered
    vm.battleLog = [];
    vm.testPlayer.wins = false;
    vm.testEnemy.wins = false;
    if (vm.multiBattle) {
      player.hp = player.maxHp;
      enemy.hp = enemy.maxHp;
    } else {
      player.maxHp = player.hp;
      enemy.maxHp = enemy.hp;
    }
    vm.multiBattle = true;
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
