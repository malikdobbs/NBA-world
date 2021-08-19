function sendMail(contactForm) {
    emailjs.send("service_k4fak1g","malik", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "your_enquiry": contactForm.yourenquiry.value
    })
    .then(
        function() {
            alert("Thanks for your enquiry");
            console.log("SUCCESS");
        },
        function() {
            alert("Enquiry failed to submit");
            console.log("False");
        }
    );
    return false;  // To block from loading a new page
}