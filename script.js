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
    
    // Portfolio tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Video play functionality
    window.playVideo = function(videoElement, event) {
        event.stopPropagation();
        
        if (videoElement.paused) {
            videoElement.play();
            videoElement.controls = true;
            // Hide overlay when playing
            const overlay = videoElement.nextElementSibling;
            if (overlay && overlay.classList.contains('video-overlay')) {
                overlay.style.display = 'none';
            }
            
            // Add event listeners to show overlay when video is paused or ended
            videoElement.addEventListener('pause', function() {
                const overlay = this.nextElementSibling;
                if (overlay && overlay.classList.contains('video-overlay')) {
                    overlay.style.display = 'flex';
                }
                this.controls = false;
            });
            
            videoElement.addEventListener('ended', function() {
                const overlay = this.nextElementSibling;
                if (overlay && overlay.classList.contains('video-overlay')) {
                    overlay.style.display = 'flex';
                }
                this.controls = false;
            });
        } else {
            videoElement.pause();
        }
    };
    
    // Portfolio items sizing
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            if (img.complete) {
                setSize(item, img);
            } else {
                img.addEventListener('load', () => setSize(item, img));
            }
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
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    // Check if the source is a video file
    const isVideo = src.toLowerCase().includes('.mp4') || src.toLowerCase().includes('.webm') || src.toLowerCase().includes('.ogg');
    
    if (isVideo) {
        modalImg.innerHTML = `<video src="${src}" controls muted loop style="max-width: 100%; max-height: 100%; object-fit: contain;"></video>`;
    } else {
        modalImg.innerHTML = `<img src="${src}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    // Stop video playback if modal contains video
    const video = modalImg.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
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