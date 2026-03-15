document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. MOBILE NAVIGATION TOGGLE
       ========================================= */
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Dynamically create a hamburger menu icon
    const hamburger = document.createElement('div');
    hamburger.innerHTML = '&#9776;'; // Hamburger HTML entity
    hamburger.style.fontSize = '1.8rem';
    hamburger.style.cursor = 'pointer';
    hamburger.style.display = 'none'; 
    hamburger.style.color = 'var(--text-main)';
    
    // Insert it into the navbar
    nav.insertBefore(hamburger, navLinks);

    // Function to handle screen resizing
    function handleResize() {
        if (window.innerWidth <= 800) {
            hamburger.style.display = 'block';
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--bg-card)';
            navLinks.style.padding = '20px 0';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        } else {
            hamburger.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.padding = '0';
            navLinks.style.background = 'transparent';
            navLinks.style.borderBottom = 'none';
        }
    }

    // Toggle menu visibility on click
    hamburger.addEventListener('click', () => {
        if (navLinks.style.display === 'none') {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });

    window.addEventListener('resize', handleResize);
    handleResize(); // Run once on load


    /* =========================================
       2. QUANTITY CONTROLS (+ / -)
       ========================================= */
    const qtyControls = document.querySelectorAll('.qty-controls, .quantity');
    
    qtyControls.forEach(control => {
        const minusBtn = control.querySelector('button:first-child');
        const plusBtn = control.querySelector('button:last-child');
        const input = control.querySelector('input');

        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                if (val > 1) input.value = val - 1;
            });
            plusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                input.value = val + 1;
            });
        }
    });


    /* =========================================
       3. ADD TO CART & GLOBAL COUNTER
       ========================================= */
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartLinks = document.querySelectorAll('a[href="cart.html"]');

    // Retrieve the cart count from local storage, or default to 0
    let cartCount = parseInt(localStorage.getItem('nexusCartCount')) || 0;

    // Function to update all cart links in the navbar
    function updateCartUI() {
        cartLinks.forEach(link => {
            if (link.innerText.includes('Cart')) {
                link.innerText = `Cart (${cartCount})`;
            }
        });
    }
    
    // Update the UI immediately on page load
    updateCartUI();

    // Handle "Add to Cart" button clicks
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the link from redirecting immediately
            
            // Check if there is a quantity selector on the page
            const qtyInput = document.querySelector('.quantity input');
            const qty = qtyInput ? parseInt(qtyInput.value) : 1;

            // Add to total and save to browser memory
            cartCount += qty;
            localStorage.setItem('nexusCartCount', cartCount);
            updateCartUI();

            // Visual feedback: Turn button green temporarily
            const originalText = btn.innerText;
            const originalBg = window.getComputedStyle(btn).backgroundColor;
            const originalBoxShadow = window.getComputedStyle(btn).boxShadow;

            btn.innerText = 'Added to Cart!';
            btn.style.background = '#10b981'; // Emerald green
            btn.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
            
            // Revert back after 1.5 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.boxShadow = originalBoxShadow;
            }, 1500);
        });
    });
});