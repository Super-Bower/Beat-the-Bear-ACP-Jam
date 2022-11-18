let playerHealth = 10;
let playerDamage = 5;
let playerCrit = 1;
let playerHeal = 1;

let maxPlayerHealth = 10;
let playerHealAmount = 0;

let bearHealth = 100;
let bearDamage = 14;
let bearCrit = 15;
let bearHeal = 35;

let bearHealAmount = 30;

let howManyLevels = 0;

let playerLevel = 0;
let unitToAdd = 1;

let berryScore = 0;

/*
document.getElementById("healthDiv").addEventListener("click", addHealth);
document.getElementById("damageDiv").addEventListener("click", addDamage);
document.getElementById("critDiv").addEventListener("click", addCrit);
document.getElementById("healDiv").addEventListener("click", addHeal);
*/

//document.getElementById("testButton5").addEventListener("click", levelUpReady);

document.getElementById("berryBlock").addEventListener("click", berryGame);

for (num = 1; num <= 8; num++) {
  let whichBerry = "berry" + num;
  document.getElementById(whichBerry).addEventListener("click", function(){berryHit(whichBerry);});
}

document.getElementById("beginFight").addEventListener("click", beginFight);

function addHealth() {
  if (playerHealth + unitToAdd < 100) {
    playerHealth += unitToAdd;
    maxPlayerHealth += unitToAdd;
    playerHealAmount = Math.round(maxPlayerHealth * 0.3);
    document.getElementById("playerHealth").innerHTML = "Health - " + playerHealth;
  }
  else {
    playerHealth = 100;
    maxPlayerHealth = 100;
    playerHealAmount = 30;
    document.getElementById("playerHealth").innerHTML = "Health - " + playerHealth;
  }
  levelUp();
}
function addDamage() {
  if (playerDamage + unitToAdd < 100) {
    playerDamage += unitToAdd;
    document.getElementById("playerDamage").innerHTML = "Damage - " + playerDamage;
  }
  else {
    playerDamage = 100;
    document.getElementById("playerDamage").innerHTML = "Damage - " + playerDamage;
  }
  levelUp();
}
function addCrit() {
  if (playerCrit + unitToAdd < 100) {
    playerCrit += unitToAdd;
    document.getElementById("playerCrit").innerHTML = "Crit. Attack Chance - " + playerCrit + "%";
  }
  else {
    playerCrit = 100;
    document.getElementById("playerCrit").innerHTML = "Crit. Attack Chance - " + playerCrit + "%";
  }
  levelUp();
}
function addHeal() {
  if (playerHeal + unitToAdd < 100) {
    playerHeal += unitToAdd;
    document.getElementById("playerHeal").innerHTML = "Heal Chance - " + playerHeal + "%";
  }
  else {
    playerHeal = 100;
    document.getElementById("playerHeal").innerHTML = "Heal Chance - " + playerHeal + "%";
  }
  levelUp();
}

function levelUp() {
  playerLevel += 1;
  unitToAdd = Math.round(playerLevel * 1.4);
  document.getElementById("playerLevel").innerHTML = "Level - " + playerLevel;
  document.getElementById("playerIncrease").innerHTML = "Stat Increase Amount - " + unitToAdd;

  howManyLevels--;
  if (howManyLevels <= 0) {
    document.getElementById("textLevel").style.color = "rgba(160, 160, 160, 0.4)";
    document.getElementById("howToLevel").style.color = "rgba(160, 160, 160, 0.4)";
    document.getElementById("levelBackground").style.backgroundColor = "rgba(110, 110, 110, 0.6)";
    document.getElementById("textLevel").innerHTML = "Level Up ready!";
    
    document.getElementById("healthDiv").removeEventListener("click", addHealth);
    document.getElementById("damageDiv").removeEventListener("click", addDamage);
    document.getElementById("critDiv").removeEventListener("click", addCrit);
    document.getElementById("healDiv").removeEventListener("click", addHeal);
  }

  else {
    document.getElementById("textLevel").innerHTML = "Level Up ready! (" + howManyLevels + ")";
  }
}

function levelUpReady() {
  document.getElementById("textLevel").style.color = "whitesmoke";
  document.getElementById("howToLevel").style.color = "whitesmoke";
  document.getElementById("levelBackground").style.backgroundColor = "rgba(30, 200, 80, 0.9)";
  
  howManyLevels++;
  document.getElementById("healthDiv").addEventListener("click", addHealth);
  document.getElementById("damageDiv").addEventListener("click", addDamage);
  document.getElementById("critDiv").addEventListener("click", addCrit);
  document.getElementById("healDiv").addEventListener("click", addHeal);

  if (howManyLevels > 1) {
    document.getElementById("textLevel").innerHTML = "Level Up ready! (" + howManyLevels + ")";
  }
}

function beginFight() {
  //begin fight button
  document.getElementById("beginFight").style.display = "none";
  document.getElementById("backgroundM").style.display = "none";
  document.getElementById("bear").style.display = "inline-block";

  //Level text
  document.getElementById("textLevel").style.color = "rgba(160, 160, 160, 0.4)";
  document.getElementById("howToLevel").style.color = "rgba(160, 160, 160, 0.4)";
  document.getElementById("levelBackground").style.backgroundColor = "rgba(110, 110, 110, 0.6)";
  document.getElementById("textLevel").innerHTML = "Level Up ready!";

  //level buttons
  document.getElementById("healthDiv").removeEventListener("click", addHealth);
  document.getElementById("damageDiv").removeEventListener("click", addDamage);
  document.getElementById("critDiv").removeEventListener("click", addCrit);
  document.getElementById("healDiv").removeEventListener("click", addHeal);

  howManyLevels = 0;

  playerTurn();
}

function playerTurn() {
  document.getElementById("battleDialogueDiv").style.display = "none";
  
  document.getElementById("textAttack").style.color = "whitesmoke";
  document.getElementById("textHeal").style.color = "whitesmoke";
  document.getElementById("attackBackground").style.backgroundColor = "rgba(30, 200, 80, 0.9)";
  document.getElementById("healBackground").style.backgroundColor = "rgba(30, 200, 80, 0.9)";

  
  document.getElementById("attackBackground").addEventListener("click", attackBear);
  document.getElementById("healBackground").addEventListener("click", playerHealed);
}

function attackBear() {
  document.getElementById("battleDialogueDiv").style.display = "block";
  
  if (bearHealth - playerDamage > 0) {
    if ((Math.floor(Math.random() * 100) + 1) <= playerCrit) {
      document.getElementById("bearHealth").innerHTML = "Health - " + (bearHealth - (playerDamage * 2));
      bearHealth -= (playerDamage * 2);

      document.getElementById("battleDialogue").innerHTML = "- Caveman attacks, and gets a critical hit dealing " + (playerDamage * 2) + " damage";
    }

    else {
      document.getElementById("bearHealth").innerHTML = "Health - " + (bearHealth - playerDamage);
      bearHealth -= playerDamage;

      document.getElementById("battleDialogue").innerHTML = "- Caveman attacks, dealing " + playerDamage + " damage";
    }

    document.getElementById("attackBackground").removeEventListener("click", attackBear);
    document.getElementById("healBackground").removeEventListener("click", playerHealed);
    bearTurn();
  }

  else {
    document.getElementById("bearHealth").innerHTML = "Health - " + 0;
    bearHealth = 0;

    document.getElementById("attackBackground").removeEventListener("click", attackBear);
    document.getElementById("healBackground").removeEventListener("click", playerHealed);
    
    //Win function
    document.getElementById("battleDialogue").innerHTML = "- Caveman attacks and wins";
  }
}

function playerHealed() {
  document.getElementById("battleDialogueDiv").style.display = "block";

  if ((Math.floor(Math.random() * 100) + 1) <= playerHeal) {
    if (playerHealth + playerHealAmount <= 100) {
      playerHealth += playerHealAmount;
      document.getElementById("playerHealth").innerHTML = "Health - " + playerHealth;

      document.getElementById("battleDialogue").innerHTML = "- Caveman heals, gaining " + playerHealAmount + " health";
    }

    else {
      playerHealth = 100;
      document.getElementById("playerHealth").innerHTML = "Health - " + 100;

      document.getElementById("battleDialogue").innerHTML = "- Caveman heals to full health";
    }
  }

  else {
    document.getElementById("battleDialogue").innerHTML = "- Caveman tries to heal, but fails";
  }

  document.getElementById("attackBackground").removeEventListener("click", attackBear);
  document.getElementById("healBackground").removeEventListener("click", playerHealed);
  bearTurn();
}

function bearTurn() {
  document.getElementById("textAttack").style.color = "rgba(160, 160, 160, 0.4)";
  document.getElementById("textHeal").style.color = "rgba(160, 160, 160, 0.4)";
  document.getElementById("attackBackground").style.backgroundColor = "rgba(110, 110, 110, 0.6)";
  document.getElementById("healBackground").style.backgroundColor = "rgba(110, 110, 110, 0.6)";

  if ((Math.floor(Math.random() * 100) + 1) <= 70) {
    //Bear attacks player
    const bearPause1 = setTimeout(attackPlayer, 2000);
  }

  else {
    //Bear heals
    const bearPause1 = setTimeout(bearHealed, 2000);
  }
}

function attackPlayer() {
  if (playerHealth - bearDamage > 0) {
    if ((Math.floor(Math.random() * 100) + 1) <= bearCrit) {
      document.getElementById("playerHealth").innerHTML = "Health - " + (playerHealth - (bearDamage * 2));
      playerHealth -= (bearDamage * 2);

      document.getElementById("battleDialogue").innerHTML += "<br>- Bear attacks, and gets a critical hit dealing " + (bearDamage * 2) + " damage";

      if (playerHealth < 0) {
        document.getElementById("playerHealth").innerHTML = "Health - " + 0;
        playerHealth = 0;

        document.getElementById("battleDialogue").innerHTML += "<br>- Bear attacks and the Caveman loses";

        document.getElementById("attackBackground").removeEventListener("click", attackBear);
        document.getElementById("healBackground").removeEventListener("click", playerHealed);

        //Lose function
      }
    }
      
    else {
      document.getElementById("playerHealth").innerHTML = "Health - " + (playerHealth - bearDamage);
      playerHealth -= bearDamage;

      document.getElementById("battleDialogue").innerHTML += "<br>- Bear attacks, dealing " + bearDamage + " damage";
    }
    
    const bearPause2 = setTimeout(playerTurn, 2000);
  }

  else {
    document.getElementById("playerHealth").innerHTML = "Health - " + 0;
    playerHealth = 0;

    document.getElementById("battleDialogue").innerHTML += "<br>- Bear attacks and the Caveman loses";

    document.getElementById("attackBackground").removeEventListener("click", attackBear);
    document.getElementById("healBackground").removeEventListener("click", playerHealed);
      
    //Lose function
  }
}

function bearHealed() {
  if ((Math.floor(Math.random() * 100) + 1) <= bearHeal) {
    if (bearHealth + bearHealAmount <= 100) {
      bearHealth += bearHealAmount;
      document.getElementById("bearHealth").innerHTML = "Health - " + bearHealth;

      document.getElementById("battleDialogue").innerHTML += "<br>- Bear heals, gaining " + bearHealAmount + " health";
    }

    else {
      bearHealth = 100;
      document.getElementById("bearHealth").innerHTML = "Health - " + bearHealth;

      document.getElementById("battleDialogue").innerHTML += "<br>- Bear heals to full health";
    }
  }

  else {
    document.getElementById("battleDialogue").innerHTML += "<br>- Bear tries to heal, but fails";
  }

  const bearPause2 = setTimeout(playerTurn, 2000);
}

function berryGame() {
  //Setup
  document.getElementById("backgroundL").style.display = "none";
  document.getElementById("backgroundM").style.display = "none";
  document.getElementById("backgroundR").style.display = "none";

  document.getElementById("levelBackground").style.display = "none";
  document.getElementById("attackBackground").style.display = "none";
  document.getElementById("healBackground").style.display = "none";

  //document.getElementById("testButton5").style.display = "none";

  document.getElementById("berryBush").style.display = "block";

  //Berry randomization
  for (num = 1; num <= 8; num++) {
    let whichBerry = "berry" + num;
    let berryScale = Math.floor(Math.random() * 50) + 20;

    document.getElementById(whichBerry).style.display = "inline-block";
    
    document.getElementById(whichBerry).style.width = berryScale + "px";
    document.getElementById(whichBerry).style.height = berryScale + "px";
    
    document.getElementById(whichBerry).style.top = (Math.floor(Math.random() * 50) + 1) + "%";
    document.getElementById(whichBerry).style.left = (Math.floor(Math.random() * 50) + 25) + "%";

    //document.getElementById(whichBerry).addEventListener("click", function(){berryHit(whichBerry);});

    const berryPause = setTimeout(function(){
      document.getElementById("backgroundL").style.display = "block";
      document.getElementById("backgroundM").style.display = "block";
      document.getElementById("backgroundR").style.display = "block";
    
      document.getElementById("levelBackground").style.display = "block";
      document.getElementById("attackBackground").style.display = "block";
      document.getElementById("healBackground").style.display = "block";
    
      document.getElementById("berryBush").style.display = "none";
    }, 4200);
  }
}

function berryHit(berry) {
  document.getElementById(berry).style.display = "none";

  berryScore++;
  if (berryScore >= 4) {
    levelUpReady();
    berryScore = 0;
  }
}