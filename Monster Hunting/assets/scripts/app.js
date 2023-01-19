const damageValue = 10;
const monsterDamage = 14;
const strongDamage = 18;
const healCapacity = 25;
const log = [];
const eventPlayerAttack = "Player attack";
const eventMonsterAttack = "Monster attack";
const eventStrongAttack = "Strong attack";

function startBarValues() {
  const enteredValue = prompt("Enter The MAX Health", "100");
  const parsedValue = enteredValue;

  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: "Invalid Number" };
  }

  return parsedValue;
}
let startHealthBar;

try {
  startHealthBar = startBarValues();
} catch (error) {
  console.log(error);
  alert("You've entered the wrong data");
  startHealthBar = 100;
} finally {
//   alert("E");
}

function writeToLog(ev, val, health) {
  let logEnteries = {
    event: ev,
    Damagevalue: val,
    health: health,
  };

  switch (ev) {
    case eventPlayerAttack:
      logEnteries.target = "Monster";
      break;
    case eventMonsterAttack:
      logEnteries.target = "Player";
      break;
    case eventStrongAttack:
      logEnteries.target = "Monster";
      break;
    default:
      logEnteries = {};
  }

  /*if(ev === eventPlayerAttack){
        logEnteries.target = 'Monster';
    } else if (ev === eventMonsterAttack){
        logEnteries.target = 'Player';
    } else if (ev === eventStrongAttack){
        logEnteries.target = 'Monster';
    }*/
  log.push(logEnteries);
}

let hasBonusLife = true;
let currentPlayerHealth = startHealthBar;
let currentMonsterHealth = startHealthBar;

adjustHealthBars(startHealthBar);

function reset() {
  currentMonsterHealth = startHealthBar;
  currentPlayerHealth = startHealthBar;
  resetGame(startHealthBar);
  alert("New GAME");
}

function endRound() {
  const playerDamage = dealPlayerDamage(monsterDamage);
  currentPlayerHealth -= playerDamage;
  writeToLog(eventMonsterAttack, playerDamage, currentPlayerHealth);
  if (currentPlayerHealth < 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = startHealthBar;
    setPlayerHealth(currentPlayerHealth);
    alert("Enjoy Your Extra Life");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("Draw");
  }

  if (currentPlayerHealth < 0 || currentMonsterHealth < 0) {
    reset();
  }
}

function monsterWork(mode) {
  if (mode == "Attack") {
    const damage = dealMonsterDamage(damageValue);
    currentMonsterHealth -= damage;
    writeToLog(eventPlayerAttack, damage, currentMonsterHealth);
  } else if (mode == "Strong") {
    const damage = dealMonsterDamage(strongDamage);
    currentMonsterHealth -= damage;
    writeToLog(eventStrongAttack, damage, currentMonsterHealth);
  }

  endRound();
}

function attackHandler() {
  monsterWork("Attack");
}

function strongAttackHandler() {
  monsterWork("Strong");
}

function healer() {
  let heal_value;
  if (currentPlayerHealth >= startHealthBar - healCapacity) {
    alert("Your Health bar is already full");
    //heal_value = startHealthBar - currentPlayerHealth;
    heal_value = null;
  } else {
    heal_value = healCapacity;
  }
  increasePlayerHealth(heal_value);
  currentPlayerHealth += heal_value;
  endRound();
}

function printLog() {
  /*  let j=1
    while(true){
        j++;
        console.log(j);
    }*/
  //    for(let i=0; i<log.length; i++){
  //        console.log(log[i]);
  //    }
  let i = 0;
  for (const enteries of log) {
    console.log(`# ${i} `);

    for (const key in enteries) {
      console.log(`${key} = ${enteries[key]}`);
    }

    i++;
    break;
  }
  //console.log(log);

  /*

    for(const key in log){
        console.log(log[key]);
    }
    */
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healer);
logBtn.addEventListener("click", printLog);
