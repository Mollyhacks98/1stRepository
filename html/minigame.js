
  // --- Hero & Enemy Classes ---
  class Hero {
    constructor(name, hp, attackRange) {
      this.name = name;
      this.hp = hp;
      this.attackRange = attackRange; // [min, max]
      this.img = "";
      this.trait = "";
      this.specialMove = function(enemy) {}; // placeholder, will be replaced
    }
    attack(enemy) {
      let damage = Math.floor(Math.random() * (this.attackRange[1] - this.attackRange[0] + 1)) + this.attackRange[0];
      enemy.hp -= damage;
      return `${this.name} attacks for ${damage} damage!`;
    }
    heal() {
      let healAmount = Math.floor(Math.random() * 15) + 5;
      this.hp += healAmount;
      return `${this.name} heals for ${healAmount} HP.`;
    }
  }

  class Enemy {
    constructor(name, hp, img) {
      this.name = name;
      this.maxHp = hp;
      this.hp = hp;
      this.img = img;
    }
    attack(hero) {
      let damage = Math.floor(Math.random() * 15) + 5;
      hero.hp -= damage;
      return `${this.name} strikes back for ${damage} damage!`;
    }
    reset() {
      this.hp = this.maxHp;
    }
  }

  // --- Global Variables ---
  let hero;
  let enemies = [
    new Enemy("Goblin", 80, "goblin.png"),
    new Enemy("Orc", 100, "orc.png"),
    new Enemy("Dragon", 150, "dragon.png")
  ];
  let currentEnemyIndex = 0;
  let enemy;

  // --- Login Validation ---
  function validateLogin() {
    let username = document.getElementById("username").value;
    let age = parseInt(document.getElementById("age").value);
    let password = document.getElementById("password").value;
    let message = "";

    if (password.length < 6) {
      message = "Password too short!";
    } else if (!/\d/.test(password)) {
      message = "Password must contain a number!";
    } else if (age < 13) {
      message = "You must be at least 13 years old!";
    } else {
      message = "Login successful!";
      startGame(username);
    }

    document.getElementById("loginMessage").innerText = message;
  }

  // --- Start Game ---
  function startGame(username) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("rpgSection").style.display = "block";

    let choice = document.getElementById("heroClass").value;

    if (choice === "warrior") {
      hero = new Hero(username, 120, [8, 18]);
      hero.img = "warrior.png";
      hero.trait = "Strong defense vs Goblins";
      hero.specialMove = function(enemy) {
        let heal = 20;
        this.hp += heal;
        if(this.hp > 120) this.hp = 120;
        return `${this.name} uses Shield Block and heals ${heal} HP! 🛡️`;
      };
    } else if (choice === "mage") {
      hero = new Hero(username, 80, [15, 30]);
      hero.img = "mage.png";
      hero.trait = "High damage but fragile";
      hero.specialMove = function(enemy) {
        let damage = 35;
        enemy.hp -= damage;
        return `${this.name} casts Fireball for ${damage} damage! 🔥`;
      };
    } else if (choice === "rogue") {
      hero = new Hero(username, 100, [5, 25]);
      hero.img = "rogue.png";
      hero.trait = "Quick and sneaky";
      hero.specialMove = function(enemy) {
        let damage1 = Math.floor(Math.random() * 15) + 5;
        let damage2 = Math.floor(Math.random() * 10) + 5;
        enemy.hp -= (damage1 + damage2);
        return `${this.name} strikes twice for ${damage1 + damage2} damage! ⚔️`;
      };
    }

    enemy = enemies[currentEnemyIndex];
    document.getElementById("playerName").innerText = username;
    document.getElementById("heroImage").src = hero.img;
    document.getElementById("enemyImage").src = enemy.img;
    updateStats();
  }

 function updateStats() {
  document.getElementById("heroStats").innerText = `${hero.name} HP: ${hero.hp}`;
  document.getElementById("enemyStats").innerText = `${enemy.name} HP: ${enemy.hp}`;

  // Update HP bars
  let heroPercent = Math.max((hero.hp / heroMaxHp()) * 100, 0);
  let enemyPercent = Math.max((enemy.hp / enemy.maxHp) * 100, 0);
  document.getElementById("heroHpBar").style.width = heroPercent + "%";
  document.getElementById("enemyHpBar").style.width = enemyPercent + "%";
}

// Helper to get max HP based on hero type
function heroMaxHp() {
  let choice = document.getElementById("heroClass").value;
  if(choice === "warrior") return 120;
  if(choice === "mage") return 80;
  if(choice === "rogue") return 100;
  return 100;
}


  // --- Attack, Heal, Special ---
  function attackEnemy() {
    if(hero.hp <= 0) return;
    let log = hero.attack(enemy) + "<br>";
    if(enemy.hp <= 0) {
      enemy.hp = 0;
      log += `${enemy.name} defeated!<br>`;
      nextEnemy();
    } else {
      log += enemy.attack(hero);
    }
    checkHeroDeath();
    document.getElementById("battleLog").innerHTML += log + "<br>";
    updateStats();
  }

  function healHero() {
    if(hero.hp <= 0) return;
    let log = hero.heal() + "<br>";
    if(enemy.hp > 0) log += enemy.attack(hero);
    checkHeroDeath();
    document.getElementById("battleLog").innerHTML += log + "<br>";
    updateStats();
  }

  function useSpecial() {
    if(hero.hp <= 0 || enemy.hp <= 0) return;
    let log = hero.specialMove(enemy) + "<br>";
    if(enemy.hp <= 0) {
      enemy.hp = 0;
      log += `${enemy.name} defeated!<br>`;
      nextEnemy();
    } else {
      log += enemy.attack(hero);
    }
    checkHeroDeath();
    document.getElementById("battleLog").innerHTML += log + "<br>";
    updateStats();
  }

  // --- Check Hero Death ---
  function checkHeroDeath() {
    if(hero.hp <= 0) {
      hero.hp = 0;
      document.getElementById("battleLog").innerHTML += `<br>💀 ${hero.name} has fallen... GAME OVER!`;
      // disable buttons by hiding them (since no addEventListener)
      document.querySelectorAll("#rpgSection button").forEach(b => b.disabled = true);
    }
  }

  // --- Next Enemy ---
  function nextEnemy() {
    currentEnemyIndex++;
    if(currentEnemyIndex >= enemies.length) currentEnemyIndex = 0;
    enemy = enemies[currentEnemyIndex];
    enemy.reset();
    document.getElementById("enemyImage").src = enemy.img;
    document.getElementById("battleLog").innerHTML += `<br>⚔️ A new ${enemy.name} approaches!<br>`;
    updateStats();
  }
function restartGame() {
  // reset hero selection and login screen
  document.getElementById("rpgSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("battleLog").innerHTML = "";
  document.querySelectorAll("#rpgSection button").forEach(b => b.disabled = false);
}

