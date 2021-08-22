let isLocked = false;
let isVictory = false;
let clicked = [];
let totalTime;
let amateurGameCountDown;
let gameTimer;

var audio = new Audio('assets/audio/blues-music.wav');
audio.loop= true;

function playMusic() { 
    if(!audio.paused) {  
        audio.pause();  
        audio.currentTime = 0;  
    }
    else {
        audio.play(); 
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
                 if (clicked.length == 2) {
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
        const min = 0;
        const max = this.cardsArray.length - 1;
        const index = Math.floor(Math.random() * (max - min) + min);

        const cssClassName = this.cardsArray[index];
        
        this.cardsArray.splice(index, 1);
        
        return cssClassName;
    }

    shuffleCards() {
        const allDivs = document.querySelectorAll('.front-card');


        for(let i = 0; i < allDivs.length; i++) {
            const currentDiv = allDivs[i];
            const className = this.getRandomCardClassName();

            currentDiv.setAttribute('data-name', className)
            currentDiv.parentElement.setAttribute('data-name', className);
        }
    }

    canFlipCard(card) {
        const isAlreadyMatched = card.classList.contains('cardsMatched');
        return isAlreadyMatched === false;
    }
}

function ready() {
    let textOverlays = Array.from(document.getElementsByClassName('text-overlay'));
    let cards = Array.from(document.getElementsByClassName('game-card'));
    let game = new NbaWorld();


    textOverlays.forEach(overlay => {
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


