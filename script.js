document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Portfolio items sizing
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        if (img.complete) {
            setSize(item, img);
        } else {
            img.addEventListener('load', () => setSize(item, img));
        }
    });
    
    function setSize(item, img) {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        let size;
        
        if (aspectRatio < 0.8) {
            size = 'small'; // Landscape images
        } else if (aspectRatio >= 0.8 && aspectRatio < 1.2) {
            size = 'medium'; // Square-ish images
        } else if (aspectRatio >= 1.2 && aspectRatio < 1.6) {
            size = 'large'; // Portrait images
        } else {
            size = 'xlarge'; // Very tall images
        }
        
        item.setAttribute('data-size', size);
    }
});

// Modal functionality
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});