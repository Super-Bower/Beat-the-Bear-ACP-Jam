let playerHealth = 10;
let playerDamage = 5;
let playerCrit = 3;
let playerHeal = 15;

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

let mouseStat = false;
let mouseAction = false;

let berryScore = 0;

let honeyChance1 = 95;
let honeyChance2 = 75;
let honeyChance3 = 55;
let honeyScore = 0;

let honeyStart = true;

/*
document.getElementById("healthDiv").addEventListener("click", addHealth);
document.getElementById("damageDiv").addEventListener("click", addDamage);
document.getElementById("critDiv").addEventListener("click", addCrit);
document.getElementById("healDiv").addEventListener("click", addHeal);
*/

//document.getElementById("testButton5").addEventListener("click", levelUpReady);

document.getElementById("howToPlay").addEventListener("click", function(){alert("To vanquish the bear, you must upgrade your stats, by completing tasks. When you're ready, you can click 'Fight the Bear'. The Challenge of this game lies in how LOW of level can you be at, yet still being able to defeat the bear.");});

document.getElementById("healthDiv").addEventListener("mouseover", function(){mouseChangeEnter("healthDiv")});
document.getElementById("damageDiv").addEventListener("mouseover", function(){mouseChangeEnter("damageDiv")});
document.getElementById("critDiv").addEventListener("mouseover", function(){mouseChangeEnter("critDiv")});
document.getElementById("healDiv").addEventListener("mouseover", function(){mouseChangeEnter("healDiv")});

document.getElementById("berryBlock").addEventListener("click", berryGame);
for (num = 1; num <= 8; num++) {
  let whichBerry = "berry" + num;
  document.getElementById(whichBerry).addEventListener("click", function(){berryHit(whichBerry);});
}


document.getElementById("hiveBlock").addEventListener("click", hiveGame);
document.getElementById("leaveHive").addEventListener("click", hiveEnd);

document.getElementById("honeycomb1").addEventListener("click", function(){combHit(honeyChance1, 0.34);});
document.getElementById("honeycomb2").addEventListener("click", function(){combHit(honeyChance2, 0.50);});
document.getElementById("honeycomb3").addEventListener("click", function(){combHit(honeyChance3, 0.66);});


document.getElementById("beginFight").addEventListener("click", beginFight);

document.getElementById("attackBackground").addEventListener("mouseover", function(){mouseChangeEnter("attackBackground")});
document.getElementById("healBackground").addEventListener("mouseover", function(){mouseChangeEnter("healBackground")});

function addHealth() {
  if (playerHealth + unitToAdd < 100) {
    playerHealth += unitToAdd;
    maxPlayerHealth += unitToAdd;
    playerHealAmount = Math.floor(maxPlayerHealth * 0.3);
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

    mouseStat = false;
    mouseChangeEnter("healthDiv");
    mouseChangeEnter("damageDiv");
    mouseChangeEnter("critDiv");
    mouseChangeEnter("healDiv");
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

  mouseStat = true;

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
  mouseStat = false;

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

  mouseAction = true;
}

function attackBear() {
  document.getElementById("battleDialogueDiv").style.display = "block";
  
  if (bearHealth - playerDamage > 0) {
    if ((Math.floor(Math.random() * 100) + 1) <= playerCrit) {
      document.getElementById("bearHealth").innerHTML = "Health - " + (bearHealth - (playerDamage * 2));
      bearHealth -= (playerDamage * 2);

      if (bearHealth <= 0) {
        document.getElementById("bearHealth").innerHTML = "Health - " + 0;
        bearHealth = 0;
    
        document.getElementById("attackBackground").removeEventListener("click", attackBear);
        document.getElementById("healBackground").removeEventListener("click", playerHealed);
        
        document.getElementById("battleDialogue").innerHTML = "- Caveman attacks with a critical hit and wins";
      }

      else {
        document.getElementById("battleDialogue").innerHTML = "- Caveman attacks, and gets a critical hit dealing " + (playerDamage * 2) + " damage";

        document.getElementById("attackBackground").removeEventListener("click", attackBear);
        document.getElementById("healBackground").removeEventListener("click", playerHealed);
        bearTurn();
      }
    }

    else {
      document.getElementById("bearHealth").innerHTML = "Health - " + (bearHealth - playerDamage);
      bearHealth -= playerDamage;

      document.getElementById("battleDialogue").innerHTML = "- Caveman attacks, dealing " + playerDamage + " damage";

      document.getElementById("attackBackground").removeEventListener("click", attackBear);
      document.getElementById("healBackground").removeEventListener("click", playerHealed);
      bearTurn();
    }
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
      if (playerHealth > maxPlayerHealth || maxPlayerHealth >= 100) {
        maxPlayerHealth = playerHealth;
        playerHealAmount = Math.floor(maxPlayerHealth * 0.3);
      }
      
      document.getElementById("playerHealth").innerHTML = "Health - " + playerHealth;

      document.getElementById("battleDialogue").innerHTML = "- Caveman heals, gaining " + playerHealAmount + " health";
    }

    else {
      playerHealth = 100;
      maxPlayerHealth = 100;
      
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

  mouseAction = false;
  mouseChangeEnter("attackBackground");
  mouseChangeEnter("healBackground");

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

      if (playerHealth <= 0) {
        document.getElementById("playerHealth").innerHTML = "Health - " + 0;
        playerHealth = 0;

        document.getElementById("battleDialogue").innerHTML += "<br>- Bear attacks with a critical hit and the Caveman loses";

        document.getElementById("attackBackground").removeEventListener("click", attackBear);
        document.getElementById("healBackground").removeEventListener("click", playerHealed);
      }

      else {
        document.getElementById("battleDialogue").innerHTML += "<br>- Bear attacks, and gets a critical hit dealing " + (bearDamage * 2) + " damage";

        const bearPause2 = setTimeout(playerTurn, 2000);
      }
    }
      
    else {
      document.getElementById("playerHealth").innerHTML = "Health - " + (playerHealth - bearDamage);
      playerHealth -= bearDamage;

      document.getElementById("battleDialogue").innerHTML += "<br>- Bear attacks, dealing " + bearDamage + " damage";

      const bearPause2 = setTimeout(playerTurn, 2000);
    }
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

function hiveGame() {
  //Setup
  document.getElementById("backgroundL").style.display = "none";
  document.getElementById("backgroundM").style.display = "none";
  document.getElementById("backgroundR").style.display = "none";

  document.getElementById("levelBackground").style.display = "none";
  document.getElementById("attackBackground").style.display = "none";
  document.getElementById("healBackground").style.display = "none";

  //document.getElementById("testButton5").style.display = "none";

  document.getElementById("beehive").style.display = "block";

  if (honeyStart) {
    honeyChance1 = 95;
    honeyChance2 = 75;
    honeyChance3 = 55;

    document.getElementById("honeyText1").innerHTML = "Levels: 1/3<br>Chance: " + honeyChance1 + "%";
    document.getElementById("honeyText2").innerHTML = "Levels: 1/2<br>Chance: " + honeyChance2 + "%";
    document.getElementById("honeyText3").innerHTML = "Levels: 2/3<br>Chance: " + honeyChance3 + "%";

    document.getElementById("leaveHiveLetters2").innerHTML = "Levels Gained: 0";
  }

  for (num = 1; num <= 3; num++) {
    let whichHoney = "honey" + num;
    let whichHoneycomb = "honeycomb" + num;
    let honeyScale = Math.floor(Math.random() * 12) + 12;

    document.getElementById(whichHoney).style.display = "inline-block";
    document.getElementById(whichHoneycomb).style.display = "inline-block";
    
    document.getElementById(whichHoney).style.width = honeyScale + 15 + "%";
    document.getElementById(whichHoneycomb).style.width = honeyScale + 20 + "%";

    document.getElementById(whichHoneycomb).style.marginLeft = (Math.floor(Math.random() * 50) + 10) + "%";
  }
}

function combHit(honeyChance, honeyAmount) {
  honeyStart = false;
  if ((Math.floor(Math.random() * 100) + 1) <= honeyChance) {
    hiveGame();
    if (honeyChance3 > 6) {
      honeyChance1 -= 1;
      honeyChance2 -= 1;
      honeyChance3 -= 1;

      honeyScore += honeyAmount;
    }

    else {
      honeyChance1 = 45;
      honeyChance2 = 25;
      honeyChance3 = 5;
    }

    document.getElementById("honeyText1").innerHTML = "Levels: 1/3<br>Chance: " + honeyChance1 + "%";
    document.getElementById("honeyText2").innerHTML = "Levels: 1/2<br>Chance: " + honeyChance2 + "%";
    document.getElementById("honeyText3").innerHTML = "Levels: 2/3<br>Chance: " + honeyChance3 + "%";

    document.getElementById("leaveHiveLetters2").innerHTML = "Levels Gained: " + Math.floor(honeyScore);
  }

  else {
    document.getElementById("backgroundL").style.display = "block";
    document.getElementById("backgroundM").style.display = "block";
    document.getElementById("backgroundR").style.display = "block";
    
    document.getElementById("levelBackground").style.display = "block";
    document.getElementById("attackBackground").style.display = "block";
    document.getElementById("healBackground").style.display = "block";
    
    document.getElementById("beehive").style.display = "none";

    honeyStart = true;
    honeyScore = 0;

    document.getElementById("battleDialogueDiv").style.display = "block";
    document.getElementById("battleDialogue").innerHTML = "The Caveman got stung!";
    const hivePause = setTimeout(function(){
      document.getElementById("battleDialogueDiv").style.display = "none";
    }, 2000);
  }
}

function hiveEnd() {
  document.getElementById("backgroundL").style.display = "block";
  document.getElementById("backgroundM").style.display = "block";
  document.getElementById("backgroundR").style.display = "block";
    
  document.getElementById("levelBackground").style.display = "block";
  document.getElementById("attackBackground").style.display = "block";
  document.getElementById("healBackground").style.display = "block";
    
  document.getElementById("beehive").style.display = "none";

  honeyStart = true;
  
  for (levelAmount = 1; levelAmount <= Math.floor(honeyScore); levelAmount++) {
      levelUpReady();
  }
}

function mouseChangeEnter(element) {
  if (mouseStat) {
    document.getElementById(element).style.cursor = "pointer";
    document.getElementById("attackBackground").style.cursor = "default";
    document.getElementById("healBackground").style.cursor = "default";
  }

  else if (mouseAction) {
    document.getElementById(element).style.cursor = "pointer";
    document.getElementById("healthDiv").style.cursor = "default";
    document.getElementById("damageDiv").style.cursor = "default";
    document.getElementById("critDiv").style.cursor = "default";
    document.getElementById("healDiv").style.cursor = "default";
  }

  else {
    document.getElementById(element).style.cursor = "default";
  }
}