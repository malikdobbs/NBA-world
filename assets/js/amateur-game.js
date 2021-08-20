

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

