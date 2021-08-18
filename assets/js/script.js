function sendMail(contactForm) {
    emailjs.send("service_k4fak1g","malik", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "your_enquiry": contactForm.yourenquiry.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}