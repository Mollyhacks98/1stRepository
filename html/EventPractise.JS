/*
JavaScript for Event Handling Practice
Author: Molly Jewett
Date: 07/13/2025
*/

// Function to generate 5 random numbers and check if they are even or odd
function generateNums() {
    // Clear previous output
    document.getElementById("divOutput").innerHTML = "";

    // Loop to generate 5 random numbers
    for (let counter = 0; counter < 5; counter++) {
        // Generate a random number between 1 and 100
        let randNum = Math.floor(Math.random() * 100) + 1;

        console.log("Random num=" + randNum);

        // Determine if the number is even or odd
        let result = (randNum % 2 === 0) ? "even" : "odd";

        // Add the result to the output div
        document.getElementById("divOutput").innerHTML += 
            "<br>Random Number: " + randNum + " is " + result;
    }
}
