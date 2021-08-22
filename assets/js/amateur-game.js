let isLocked = false;
let isVictory = false;
let clicked = [];
let totalTime; // Countdown timer helped to be created by James McDowell from stackoverflow.com credited in readme.MD
let amateurGameCountDown;
let gameTimer;

var audio = new Audio('assets/audio/blues-music.wav'); // New Game audio
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
    constructor() {
        const teams = ['new-york', 'boston-celtics','brooklyn-nets','toronto-raptors','cleveland-cavs','dallas-mavs','la-lakers','golden-state'];
        this.cardsArray = [
            ...teams,
            ...teams
        ];
        
        this.scoreCard = document.getElementById('score');
        this.scoreCard.innerText = '0';
    }

    checkForVictory() {
        let allDivs = Array.from(document.querySelectorAll('.game-card'));

        isVictory = allDivs.every(div => div.classList.contains('cardsMatched'));
        
        if (isVictory) {
            document.getElementById('game-over').classList.remove('visible');
            document.getElementById('new-game').classList.remove('visible');
            document.getElementById('victory').classList.add('visible');
        }
    }

    playGame() {
        isVictory = false;
        this.cardToCheck = null;
        this.totalClicks = 1;
        this.matchedCards = [];
        this.busy = true;
        totalTime = 100;
        

        // clear all the matched cards
        document.querySelectorAll('.game-card').forEach(e => {
            e.classList.remove('visible');
            e.classList.remove('cardsMatched');
        });

        clearTimeout(gameTimer);
        clearInterval(amateurGameCountDown);

        amateurGameCountDown = setInterval(function(){
            
            if (totalTime <= 0) {
                clearInterval(amateurGameCountDown);
                document.getElementById('timer').innerHTML = '0';
            } else {
                document.getElementById('timer').innerHTML = totalTime;
            }
            totalTime -= 1;
        }, 1000);
        
        gameTimer = setTimeout(() => {
            if (!isVictory) {
                document.getElementById('game-over').classList.add('visible');
                document.getElementById('new-game').classList.remove('visible');
            }
        }, (totalTime * 1000));

    }

    flipCard(card) {
        if (!isLocked) {
            isLocked = true;
        if(this.canFlipCard(card)) {
            this.totalCLicks++;
            this.scoreCard.innerText = this.totalClicks++;
            let lastCardClickedClassName;

  
            if (clicked.length) {
                lastCardClickedClassName = clicked[0].getAttribute('data-name')
            }
        
            const currentClickedCardClassName = card.getAttribute('data-name');
            clicked.push(card);
            card.classList.add('visible');
            
            if (lastCardClickedClassName === currentClickedCardClassName){
            
               const matchingCards = document.querySelectorAll(`div.game-card[data-name="${currentClickedCardClassName}"]`);
               
               for (let i = 0; i < matchingCards.length; i++) {
                   matchingCards[i].classList.add('visible');
                   matchingCards[i].classList.add('cardsMatched');
               }
               clicked = [];
               isLocked = false;
               this.checkForVictory();
            } else {
                 // only clear once two cards have been clicked
                 if (clicked.length == 2) {
                     // After one seconds has passed hide the card
                    setTimeout(() => {
                        clicked.forEach(c => {
                            if (!c.classList.contains('cardsMatched')) {
                                c.classList.remove('visible');
                                c.classList.remove('cardsMatched');
                            }
                         });

                        clicked = [];
                        isLocked = false;
        
                    }, 1000);
                } else {
                    isLocked = false;
                }
            }
             
        } else {
            isLocked = false;
        }
    }
    }

    getRandomCardClassName() {
        //Array of 8 different card css classes
        const min = 0;
        const max = this.cardsArray.length - 1;
        //Get a random index between 0 - 7 (to represent the indexes in the above array)
        const index = Math.floor(Math.random() * (max - min) + min);

        const cssClassName = this.cardsArray[index];
        
        this.cardsArray.splice(index, 1);
        
        return cssClassName;
    }

    shuffleCards() {
        //This should return 16 divs (any that have the 'front-card' class)
        const allDivs = document.querySelectorAll('.front-card');


        for(let i = 0; i < allDivs.length; i++) {
            const currentDiv = allDivs[i];
            const className = this.getRandomCardClassName();

            currentDiv.setAttribute('data-name', className)
            currentDiv.parentElement.setAttribute('data-name', className);
        }
    }

    canFlipCard(card) {
        //card repreresens the clicked div element
        const isAlreadyMatched = card.classList.contains('cardsMatched');
        return isAlreadyMatched === false;
    }
}

function ready() {
    let textOverlays = Array.from(document.getElementsByClassName('text-overlay')); // creates an array for all overlay text
    let cards = Array.from(document.getElementsByClassName('game-card'));
    let game = new NbaWorld();


    textOverlays.forEach(overlay => { // iterate through overlay array
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game = new NbaWorld();
            game.shuffleCards();
            game.playGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        })
    });

    game.shuffleCards();
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}


