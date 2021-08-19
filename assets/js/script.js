function sendMail(contactForm) {
    emailjs.send("service_k4fak1g","malik", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "your_enquiry": contactForm.yourenquiry.value
    })
    .then(
        function() {
            alert("Thanks for your enquiry");
            document.getElementById("contact-form").reset(); // Resets contact form once user has submitted form
            console.log("Successful");
        },
        function() {
            alert("Enquiry failed to submit");
            console.log("Failed");
        }
    );
    return false;  // To block from loading a new page
}