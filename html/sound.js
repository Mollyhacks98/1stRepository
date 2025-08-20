
           
     // Grab the audio element from the page
    const audio = document.getElementById("myAudio");

    // Play the sound
    function playSound() {
      audio.play();
    }

    // Stop the sound (pause + reset to start)
    function stopSound() {
      audio.pause();
      audio.currentTime = 0;
    }

    // Mute or unmute the audio
    function toggleMute() {
      audio.muted = !audio.muted; // Switches true/false
    }

    // Adjust volume based on slider value
    function setVolume(level) {
      audio.volume = level; // level is between 0.0 (silent) and 1.0 (full volume)
    }