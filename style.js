document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('backdrop');
    const hamburgerIcon = document.getElementById('hamburger');
    const mobileLinks = document.querySelectorAll('.mobile-menu-item');

    // Function to open the mobile menu
    function openMenu() {
        if (!mobileMenu || !backdrop || !hamburgerIcon) return;
        
        // Add transition for smoother opening
        mobileMenu.style.transition = 'transform 0.5s ease-out';
        backdrop.style.transition = 'opacity 0.5s ease-out';
        
        mobileMenu.style.transform = 'translateX(0)';
        backdrop.style.display = 'block';
        backdrop.style.opacity = '1';
        hamburgerIcon.classList.add('open');

        // Staggered fade-in effect for the links with 0.5s delay between each
        mobileLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease-out';
                link.style.opacity = '1';
                link.style.transform = 'translateX(5px)';
            }, index * 500); // 0.5s (500ms) delay between items
        });
    }

    // Function to close the mobile menu
    function closeMenu() {
        if (!mobileMenu || !backdrop || !hamburgerIcon) return;

        mobileMenu.style.transition = 'transform 0.5s ease-in';
        backdrop.style.transition = 'opacity 0.5s ease-in';
        
        mobileMenu.style.transform = 'translateX(100%)';
        backdrop.style.opacity = '0';
        setTimeout(() => {
            backdrop.style.display = 'none';
        }, 500);
        hamburgerIcon.classList.remove('open');

        // Staggered fade-out for links with 0.5s delay between each
        mobileLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease-in';
                link.style.opacity = '0';
                link.style.transform = 'translateX(0)';
            }, index * 500); // 0.5s (500ms) delay between items
        });
    }

    // Add event listeners if elements exist
    if (menuButton) {
        menuButton.addEventListener('click', openMenu);
    }
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMenu);
    }
    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }
});
