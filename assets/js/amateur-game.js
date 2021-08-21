var totalTime = 100; // Countdown timer helped to be created by James McDowell from stackoverflow.com credited in readme.MD
var amateurGameCountDown = setInterval(function(){
    if (totalTime <= 0) {
        clearInterval(amateurGameCountDown);
        document.getElementById("timer").innerHTML = "0";
    } else {
        document.getElementById("timer").innerHTML = totalTime;
    }
    totalTime -= 1;
}, 1000)

var audio = new Audio("assets/audio/crowd-applause.wav"); // New Game audio
audio.loop= true;

function playMusic() { 
    if(!audio.paused) {  
        audio.pause();  
        audio.currentTime = 0;  
    }
    else {
        audio.play();  // To make it play again
    }
};

class NbaWorld {
    constructor(cards) {
        this.cardsArray = cards;
        
        this.scoreCard = document.getElementById("score");
    }
    playGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.matchedCards = [];
        this.busy = true;
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalCLicks++;
            this.scoreCard.innerText = this.totalClicks++;
        }
    }
    canFlipCard(card) {
        return true;
        //return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() {
    let textOverlays = Array.from(document.getElementsByClassName("text-overlay")); // creates an array for all overlay text
    let cards = Array.from(document.getElementsByClassName("game-card"));
    let game = new NbaWorld(100, cards);

    textOverlays.forEach(overlay => { // iterate through overlay array
        overlay.addEventListener("click", () => {
            overlay.classList.remove('visible')
            game.playGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener("click", () => {
            game.flipCard(card);
        })
    })
}

if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}

