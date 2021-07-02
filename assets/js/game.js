var fightOrSkip = function() {
  // ask user if they'd liked to fight or run
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  promptFight = promptFight.toLowerCase()

  // check to see for valid response
  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if user picks "skip" confirm and then stop the loop
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
      // subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      
      return true;
    }
  else {
    return false;
  }
  }
}
// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    
    if (fightOrSkip()){
      // if true, leave fight by breaking loop
      break;
    }

    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable

    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
  };

//function to get player name
var getPlayerName = function() {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
}

//create player and enemy information
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
          window.alert("Refilling player's health by 20 for 7 dollars.");
          this.health += 20;
          this.money -= 7;
        } 
        else {
          window.alert("You don't have enough money!");
        }
      },
      upgradeAttack: function() {
        if (this.money >= 7) {
          window.alert("Upgrading player's attack by 6 for 7 dollars.");
          this.attack += 6;
          this.money -= 7;
        } 
        else {
          window.alert("You don't have enough money!");
        }
      }
  };

  var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10,14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10,14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10,14)
    }
  ];

// fight each enemy robot by looping over them and fighting them one at a time
var startGame = function() {
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
        // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

        // use debugger to pause script from running and check what's going on at that moment in the code
        debugger;

        // pick new enemy to fight based on the index of the enemy.names array
        var pickedEnemyObj = enemyInfo[i];

        // reset enemy.health before starting new fight
        pickedEnemyObj.health = randomNumber(40,60)


        // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
        fight(pickedEnemyObj);

        //if we're not at the last enemy in the array
        if (i< enemyInfo.length -1 && playerInfo.health > 0){
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?")
             if (storeConfirm) {
            shop();
            }
        }
    }
    // if player isn't alive, stop the game
    else {
        window.alert('You have lost your robot in battle! Game Over!');
        break;
    }
    }
    // play again
    endGame()
}
// function to end entire game
var endGame = function() {
    // if player is still alive, player wins
    if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt)
    debugger
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
          case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
          window.alert("You did not pick a valid option. Try again.");
      
          // call shop() again to force player to pick a valid option
          shop();
          break;
      }
};

startGame ();