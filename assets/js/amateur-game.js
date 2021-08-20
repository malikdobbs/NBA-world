var totalTime = 100;
var amateurGameCountDown = setInterval(function(){
    if (totalTime <= 0) {
        clearInterval(amateurGameCountDown);
        document.getElementById("timer").innerHTML = "0";
    } else {
        document.getElementById("timer").innerHTML = totalTime;
    }
    totalTime -= 1;
}, 1000)

var audio = new Audio("assets/audio/crowd-applause.wav");
audio.loop= true;

function playMusic() { //start game audio
    if(!audio.paused) {  
        audio.pause();  
        audio.currentTime = 0;  
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

