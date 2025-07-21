<script>
    // single line comment
    /* multiline comment */ 
    //this function will allow us to play our game
     // update scoreboard
        let wins =0;
        let losses = 0;
    function PlayDiceGame() {
        console.log("PlayDiceGame function called");
    
       //ypu can display helpful messages to the console to track whats going on in the porgram
        



        // set up 2 variables to hold the 2 dice rolls that my game needs to do 
        let die1 = Math.floor(Math.random() * 20) + 1; // 1-20
        let die2 = Math.floor(Math.random() * 20) + 1; // 1-20
        let total = die1 + die2;

      let message = `You rolled: ${die1} and ${die2} (Total = ${total})<br>`  
//   Game Rules (i feel like i made my game too hard, but its fine)
    // if the user rolls a 1 or a 20, they win or lose instantly
    // if the total is 30 or more, they win
    // if the user rolls doubles, they win instantly
    // if the total is less than 10, they lose
    // if the total is between 10 and 30, they neither win nor lose
 
 if (die1 === 1 || die2 ===1) { 
    message +="CRITICAL FAIL! YOU LOSE!.";
    } else if (die1 ===20 || die2 ===20) { 
        message += "AWESOMESAUCE! YOU WON!!"; 
    } else if (total >= 30) { 
        message += "You win! Your total is high enough!"; 
    } else if ( die1=== die2) { 
        message += "SNake Eyes!"; 
} else if (total < 10) { 
    message += "Not quite enough. Try again!.";
} else if (total >= 10 && total < 30) { 
    message += "Not enough to win, but you also didnt lose, so meh" 
}
    document.getElementById("result").innerHTML = message; 
// update the result div with the message
        // update the images to show the dice rolled
        document.getElementById("die1Image").src = `d20-${die1}.png`;
        document.getElementById("die2Image").src = `d20-${die2}.png`;
        
        // add a class to the images to trigger the shake animation
        let die1Image = document.getElementById("die1Image");
        let die2Image = document.getElementById("die2Image");

        die1Image.classList.add("shake");
        die2Image.classList.add("shake");
        // remove the shake class after the animation ends
        setTimeout(() => {
            die1Image.classList.remove("shake");
            die2Image.classList.remove("shake");
        }, 600); // match the duration of the animation

        die1Image.src = `d20-${die1}.png`;
        die2mage.src = `d20-${die2}.png`;

       

if (die1 === 1 || die2 === 1 || total < 10) {
            losses++;
        } else if (die1 === 20 || die2 === 20 || total >= 30 || die1 === die2) {
            wins++;
        }

        document.getElementById("wins").innerText = wins;
        document.getElementById("losses").innerText = losses;
// update dice faces
die1Image.src = `d20-${die1}.png`;
        die2Image.src = `d20-${die2}.png`;
    


    // function to simulate the rolling of a 20-sided die
    function rolldie() {
        // multiply random number between 0 and 1 by 20 so i get my random dice roll 
        return Math.ceil(Math.random() * 20);
    }
}
</script>
