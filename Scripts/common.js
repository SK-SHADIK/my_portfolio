// Hide the loader after 3 seconds (3000 milliseconds)
setTimeout(function() {
    document.querySelector('.loader-wrapper').style.display = 'none';
}, 3000);

// Selecting the header element
let header = document.querySelector('.header');

// Function to toggle header background color on scroll
function toggleHeaderBackground() {
    // Check if window is scrolled
    if (window.scrollY > 0) {
        // Add 'header-scroll' class to change header background color
        header.classList.add('header-scroll');
    } else {
        // Remove 'header-scroll' class to revert header background color
        header.classList.remove('header-scroll');
    }
}

// Event listener for scroll event to trigger toggleHeaderBackground function
window.addEventListener('scroll', toggleHeaderBackground);

function filterSelection(c) {
    let x, i;
    x = document.getElementsByClassName("project-filter-content");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        let classNames = x[i].className.split(" ");
        let index = classNames.indexOf("show");
        if (c === "" || classNames.indexOf(c) > -1) {
            if (index === -1) {
                x[i].className += " show";
            }
        } else {
            if (index > -1) {
                classNames.splice(index, 1);
                x[i].className = classNames.join(" ");
            }
        }
    }

    // Add active class to the clicked button
    let btns = document.getElementsByClassName("project-btn");
    for (let i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("active")) {
            btns[i].classList.remove("active");
        }
    }
    event.currentTarget.classList.add("active");
}

// Call filterSelection function with 'all' parameter when the page loads
window.onload = function () {
    filterSelection('all');
};

//SCROLL POSITION
window.onscroll = function () { myFunction() };

function myFunction() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}


// Contact Form Works

let form = document.querySelector(".contact_form");
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate name and email fields
    let nameInput = form.querySelector('input[name="name"]');
    let emailInput = form.querySelector('input[name="email"]');
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let isValid = true;

    // Check if name is empty
    if (name === '') {
        showError(nameInput, 'Please enter your name.');
        isValid = false;
    } else {
        hideError(nameInput);
    }

    // Check if email is empty and has valid format
    if (email === '') {
        showError(emailInput, 'Please enter your email address.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    } else {
        hideError(emailInput);
    }

    // If form is valid, submit
    if (isValid) {
        document.querySelector("#contact_submit").value = "Submitting..";
        // Show loading indicator
        let loadingIndicator = document.createElement("div");
        loadingIndicator.textContent = "Please wait while your message is being processed. Thank you for your patience!";
        loadingIndicator.style.color = "#ffe066"; // Yellow color
        loadingIndicator.style.fontSize = "18px"; // Font size 18
        loadingIndicator.style.fontWeight = "700"; // Font weight 700
        loadingIndicator.classList.add("loading-indicator");
        form.insertAdjacentElement("beforebegin", loadingIndicator);

        // Set current date and time to the hidden input field
        let now = new Date();
        let dateTimeField = document.getElementById("dateTime");
        dateTimeField.value = now.toLocaleString(); // You can customize the format here if needed

        let data = new FormData(form);
        fetch('https://script.google.com/macros/s/AKfycbzDRNY5nSjckmz9oRbr4G9B8grlmU9rO8GE48bVDFlqiJ7BX-UaX0GPrsguKqjWqOra2A/exec', {
            method: "POST",
            body: data
        })
            .then(res => res.text())
            .then(data => {
                document.querySelector("#contact_submit").value = "Submit";
                // Remove loading indicator
                loadingIndicator.remove();
                // Display submission message
                let messageContainer = document.createElement("div");
                messageContainer.textContent = "Your message has been successfully submitted. I will be in touch with you soon. Thank you!";
                messageContainer.classList.add("submission-message");
                messageContainer.style.color = "#ffe066"; // Yellow color
                messageContainer.style.fontSize = "18px"; // Font size 18
                messageContainer.style.fontWeight = "700"; // Font weight 700
                form.insertAdjacentElement("beforebegin", messageContainer);
                window.location.href = "index.html";
                // Clear form fields after successful submission
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                // Remove loading indicator in case of an error
                loadingIndicator.remove();
            });
    }
});

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show error message
function showError(input, message) {
    let errorElement = document.createElement("div");
    errorElement.textContent = message;
    errorElement.classList.add("error-message");
    errorElement.style.color = "#f25f5c"; // Red color
    errorElement.style.fontSize = "14px"; // Font size 18
    errorElement.style.fontWeight = "700"; // Font weight 700
    input.parentNode.appendChild(errorElement);
}

// Function to hide error message
function hideError(input) {
    let errorElement = input.parentNode.querySelector(".error-message");
    if (errorElement) {
        errorElement.remove();
    }
}