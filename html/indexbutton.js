/*
JavaScript for bouncing meme image
Author: Molly Jewett
Date: 07/13/2025
Note: Uses inline onclick buttons. No event listeners are used.
*/

// Global variables to store interval ID and direction
let interval;
let movingRight = true; // true = moving right, false = moving left

// Function to start moving the image
function StartMove() {
    const img = document.getElementById("memeimage");

    // Initialize position if not set
    if (!img.style.left) {
        img.style.left = "0px";
        img.style.position = "absolute"; // Ensure image can move
    }

    // Prevent multiple intervals from stacking
    if (interval) return;

    // Move image every 50 milliseconds
    interval = setInterval(() => {
        let currentLeft = parseInt(img.style.left);

        // Check boundaries to change direction
        if (movingRight && currentLeft + img.width >= window.innerWidth) {
            movingRight = false; // switch to moving left
        } else if (!movingRight && currentLeft <= 0) {
            movingRight = true; // switch to moving right
        }

        // Update position based on direction
        if (movingRight) {
            currentLeft += 5; // move right
        } else {
            currentLeft -= 5; // move left
        }

        // Apply new position
        img.style.left = currentLeft + "px";
    }, 50);
}

// Function to stop moving the image
function StopMove() {
    clearInterval(interval); // stop movement
    interval = null;         // allow StartMove to run again
}
