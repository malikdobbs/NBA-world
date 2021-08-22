function sendMail(contactForm) {
    emailjs.send("service_k4fak1g","malik", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "your_enquiry": contactForm.yourenquiry.value
    })
    .then(
        function() {
            alert("Thanks for your enquiry");
            document.getElementById("contact-form").reset();
        },
        function() {
            alert("Enquiry failed to submit");
        }
    );
    return false; 
}
function displayRules() {
    var displayContent = document.getElementById("modalContent");
    if (displayContent.style.display === "none") {
        displayContent.style.display = "block";
    } else {
        displayContent.style.display = "none";
    }
}

function displayContactForm() {
    var displayForm = document.getElementById("modalContactForm");
    if (displayForm.style.display === "none") {
        displayForm.style.display = "block";
    } else {
        displayForm.style.display = "none";
    }
}

function displayGameMode() {
    var displayGame = document.getElementById("modalGameModes");
    if (displayGame.style.display === "none") {
        displayGame.style.display = "block";
    } else {
        displayGame.style.display = "none";
    }
}

