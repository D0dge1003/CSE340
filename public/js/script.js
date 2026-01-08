/* ******************************************
 * Title:  CSE Motors Navigation Script
 * Purpose: Toggle the mobile menu
 * ****************************************** */

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Select the hamburger button and the navigation list
    const hamButton = document.querySelector('#hamburgerBtn');
    const primaryNav = document.querySelector('nav ul');

    // Add a click event listener to the button
    hamButton.addEventListener('click', () => {
        // Toggle the 'open' class on the navigation list
        primaryNav.classList.toggle('open');
        
        // Optional: Toggle a class on the button itself for animation effects
        hamButton.classList.toggle('open');
    });
});