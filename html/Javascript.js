
    {/* single line comment 
     multiline comment 
    /his function will allow us to play our game
      update scoreboard  */}
        let wins = 0;
        let losses = 0;
    function PlayDiceGame() {
        console.log("PlayDiceGame function called");
    
       //ypu can display helpful messages to the console to track whats going on in the porgram
        



        // set up 2 variables to hold the 2 dice rolls that my game needs to do 
        let die1 = Math.floor(Math.random() * 20) + 1; // 1-20
        let die2 = Math.floor(Math.random() * 20) + 1; // 1-20
        let total = die1 + die2;

      let message = `You rolled: ${die1} and ${die2} (Total = ${total})<br>`;  
//   Game Rules (i feel like i made my game too hard, but its fine)
    // if the user rolls a 1 or a 20, they win or lose instantly
    // if the total is 30 or more, they win
    // if the user rolls doubles, they win instantly
    // if the total is less than 10, they lose
    // if the total is between 10 and 30, they neither win nor lose
 
 if (die1 === 1 || die2 ===1) { 
    message +="CRITICAL FAIL! YOU LOSE!.";
    losses++;
    } else if (die1 ===20 || die2 ===20) { 
        message += "AWESOMESAUCE! YOU WON!!"; 
        wins++;
    } else if (total >= 30) { 
        message += "You win! Your total is high enough!"; 
        wins++;
    } else if ( die1=== die2) { 
        message += "SNake Eyes!"; 
        wins++;
} else if (total < 10) { 
    message += "Not quite enough. Try again!.";
    losses++;
} else if (total >= 10 && total < 30) { 
    message += "Not enough to win, but you also didnt lose, so meh" 
}
    document.getElementById("result").innerHTML = message; 
    document.getElementById("wins").innerText = wins;
        document.getElementById("losses").innerText = losses;

        
        // add a class to the images to trigger the shake animation
        let die1Image = document.getElementById("die1Image");
        let die2Image = document.getElementById("die2Image");
        // update the result div with the message
        // update the images to show the dice rolled
        document.getElementById("die1Image").src = `d20-${die1}.png`;
        document.getElementById("die2Image").src = `d20-${die2}.png`;

        die1Image.classList.add("shake");
        die2Image.classList.add("shake");
        // remove the shake class after the animation ends
        setTimeout(() => {
            die1Image.classList.remove("shake");
            die2Image.classList.remove("shake");
        }, 600); // match the duration of the animation
    }

