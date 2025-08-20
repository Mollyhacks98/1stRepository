// --- Hero & Enemy Classes ---
class Hero {
  constructor(name, hp, attackRange) { // Constructor defines a new Hero with name, health points, and attack range
    this.name = name; // The hero’s name
    this.hp = hp; // The hero’s health points
    this.attackRange = attackRange; // Attack damage range [min, max]
    this.img = ""; // Placeholder for hero’s image
    this.trait = ""; // Placeholder for hero’s special trait/description
    this.specialMove = function(enemy) {}; // Placeholder function for hero’s special ability
  }

  attack(enemy) { // Standard attack function
    let damage = Math.floor(Math.random() * (this.attackRange[1] - this.attackRange[0] + 1)) + this.attackRange[0]; 
    // Calculates random damage within range
    enemy.hp -= damage; // Subtract damage from enemy HP
    return `${this.name} attacks for ${damage} damage!`; // Returns attack message
  }

  heal() { // Healing function
    let healAmount = Math.floor(Math.random() * 15) + 5; // Random heal between 5 and 20
    this.hp += healAmount; // Increase hero HP
    return `${this.name} heals for ${healAmount} HP.`; // Return healing message
  }
}

class Enemy {
  constructor(name, hp, img) { // Constructor defines new Enemy
    this.name = name; // Enemy name
    this.maxHp = hp; // Enemy’s maximum HP
    this.hp = hp; // Enemy’s current HP
    this.img = img; // Enemy’s image file
  }

  attack(hero) { // Enemy’s attack function
    let damage = Math.floor(Math.random() * 15) + 5; // Random damage between 5 and 20
    hero.hp -= damage; // Subtract damage from hero HP
    return `${this.name} strikes back for ${damage} damage!`; // Returns attack message
  }

  reset() { // Reset enemy HP for next battle
    this.hp = this.maxHp;
  }
}

// --- Global Variables ---
let hero; // The player’s hero
let enemies = [ // List of enemies
  new Enemy("Goblin", 80, "goblin.png"),
  new Enemy("Orc", 100, "orc.png"),
  new Enemy("Dragon", 150, "dragon.png")
];
let currentEnemyIndex = 0; // Keeps track of which enemy you’re fighting
let enemy; // Current enemy

// --- Login Validation ---
function validateLogin() {
  let username = document.getElementById("username").value; // Get username
  let age = parseInt(document.getElementById("age").value); // Get age (convert to number)
  let password = document.getElementById("password").value; // Get password
  let message = ""; // Placeholder for login message

  // Password & age checks
  if (password.length < 6) {
    message = "Password too short!";
  } else if (!/\d/.test(password)) {
    message = "Password must contain a number!";
  } else if (age < 13) {
    message = "You must be at least 13 years old!";
  } else {
    message = "Login successful!";
    startGame(username); // If all checks pass → start the game
  }

  document.getElementById("loginMessage").innerText = message; // Show feedback message
}

// --- Start Game ---
function startGame(username) {
  // Hide login screen, show game screen
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("rpgSection").style.display = "block";

  let choice = document.getElementById("heroClass").value; // Get chosen hero class

  // --- Hero Class Setup ---
  if (choice === "warrior") {
    hero = new Hero(username, 120, [8, 18]); // Warrior has more HP but medium attack
    hero.img = "warrior.png";
    hero.trait = "Strong defense vs Goblins";
    hero.specialMove = function(enemy) { // Warrior’s special ability
      let heal = 20;
      this.hp += heal;
      if(this.hp > 120) this.hp = 120; // Cap HP at max
      return `${this.name} uses Shield Block and heals ${heal} HP! 🛡️`;
    };
  } else if (choice === "mage") {
    hero = new Hero(username, 80, [15, 30]); // Mage has low HP but high attack
    hero.img = "mage.png";
    hero.trait = "High damage but fragile";
    hero.specialMove = function(enemy) { // Mage’s special ability
      let damage = 35;
      enemy.hp -= damage;
      return `${this.name} casts Fireball for ${damage} damage! 🔥`;
    };
  } else if (choice === "rogue") {
    hero = new Hero(username, 100, [5, 25]); // Rogue has balanced stats
    hero.img = "rogue.png";
    hero.trait = "Quick and sneaky";
    hero.specialMove = function(enemy) { // Rogue’s special ability (double hit)
      let damage1 = Math.floor(Math.random() * 15) + 5;
      let damage2 = Math.floor(Math.random() * 10) + 5;
      enemy.hp -= (damage1 + damage2);
      return `${this.name} strikes twice for ${damage1 + damage2} damage! ⚔️`;
    };
  }

  // Set up first enemy
  enemy = enemies[currentEnemyIndex];
  document.getElementById("playerName").innerText = username;
  document.getElementById("heroImage").src = hero.img;
  document.getElementById("enemyImage").src = enemy.img;
  updateStats(); // Update the stats on screen
}

// --- Update Stats ---
function updateStats() {
  // Update text stats
  document.getElementById("heroStats").innerText = `${hero.name} HP: ${hero.hp}`;
  document.getElementById("enemyStats").innerText = `${enemy.name} HP: ${enemy.hp}`;

  // Update HP bars visually
  let heroPercent = Math.max((hero.hp / heroMaxHp()) * 100, 0);
  let enemyPercent = Math.max((enemy.hp / enemy.maxHp) * 100, 0);
  document.getElementById("heroHpBar").style.width = heroPercent + "%";
  document.getElementById("enemyHpBar").style.width = enemyPercent + "%";
}

// Helper function to get hero’s max HP (so HP bar works correctly)
function heroMaxHp() {
  let choice = document.getElementById("heroClass").value;
  if(choice === "warrior") return 120;
  if(choice === "mage") return 80;
  if(choice === "rogue") return 100;
  return 100;
}

// --- Attack, Heal, Special ---
function attackEnemy() {
  if(hero.hp <= 0) return; // If hero is dead → do nothing
  let log = hero.attack(enemy) + "<br>"; // Hero attacks

  if(enemy.hp <= 0) { // If enemy dies
    enemy.hp = 0;
    log += `${enemy.name} defeated!<br>`;
    nextEnemy(); // Load next enemy
  } else {
    log += enemy.attack(hero); // Enemy attacks back
  }

  checkHeroDeath(); // Check if hero died
  document.getElementById("battleLog").innerHTML += log + "<br>"; // Add to log
  updateStats(); // Update HP bars + stats
}

function healHero() {
  if(hero.hp <= 0) return; // Dead hero can’t heal
  let log = hero.heal() + "<br>"; // Heal
  if(enemy.hp > 0) log += enemy.attack(hero); // Enemy attacks back if alive
  checkHeroDeath();
  document.getElementById("battleLog").innerHTML += log + "<br>";
  updateStats();
}

function useSpecial() {
  if(hero.hp <= 0 || enemy.hp <= 0) return; // Dead hero or enemy → do nothing
  let log = hero.specialMove(enemy) + "<br>"; // Use special ability

  if(enemy.hp <= 0) { // If enemy dies
    enemy.hp = 0;
    log += `${enemy.name} defeated!<br>`;
    nextEnemy();
  } else {
    log += enemy.attack(hero); // Enemy fights back
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
    // Disable all RPG buttons so player can’t keep playing
    document.querySelectorAll("#rpgSection button").forEach(b => b.disabled = true);
  }
}

// --- Next Enemy ---
function nextEnemy() {
  currentEnemyIndex++; // Move to next enemy in array
  if(currentEnemyIndex >= enemies.length) currentEnemyIndex = 0; // Loop back to first enemy if all defeated
  enemy = enemies[currentEnemyIndex];
  enemy.reset(); // Reset enemy HP
  document.getElementById("enemyImage").src = enemy.img;
  document.getElementById("battleLog").innerHTML += `<br>⚔️ A new ${enemy.name} approaches!<br>`;
  updateStats();
}

// --- Restart Game ---
function restartGame() {
  // Reset to login screen
  document.getElementById("rpgSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("battleLog").innerHTML = ""; // Clear log
  document.querySelectorAll("#rpgSection button").forEach(b => b.disabled = false); // Re-enable buttons
}
