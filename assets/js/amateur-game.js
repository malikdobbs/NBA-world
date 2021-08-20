var audio = new Audio("assets/audio/crowd-applause.wav");
audio.loop= true;

function playAudio() {
    if(!audio.paused) { /* Check if it's not paused */
        audio.pause();  /* To pause the audio */
        audio.currentTime = 0;  /* To reset the time back to 0 */
    }
    else {
        audio.play();  /* To make it play again */
    }
};

function ready() {
    let textOverlays = Array.from(document.getElementsByClassName("text-overlay")); // creates an array for all overlay text
    let gameCards = Array.from(document.getElementsByClassName("game-card")); // creates array for all cards in the game

    textOverlays.forEach(overlay => { // iterate through overlay array
        overlay.addEventListener("click", () => {
            overlay.classList.remove('visible')
        })
    })
}

if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}

