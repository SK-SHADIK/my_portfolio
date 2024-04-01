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
