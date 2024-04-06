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


// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btns = document.querySelectorAll(".hire-me");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btns.forEach(function (btn) {
    btn.onclick = function () {
        modal.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Form submission
document.getElementById("hireForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    // Handle form submission here, e.g., send form data to server
    // You can use AJAX or other techniques for this purpose
    console.log("Form submitted!");
    // Close the modal after form submission
    modal.style.display = "none";
});


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
  window.onload = function() {
    filterSelection('all');
  };