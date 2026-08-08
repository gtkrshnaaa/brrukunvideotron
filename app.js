document.addEventListener("DOMContentLoaded", () => {
    // === NAVIGATION LOGIC ===
    const navLinks = document.querySelectorAll(".nav-links li");
    const pages = document.querySelectorAll(".page");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Update Active Link
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // Switch Page
            const targetId = link.getAttribute("data-target");
            pages.forEach(page => {
                if (page.id === targetId) {
                    page.classList.add("active");
                } else {
                    page.classList.remove("active");
                }
            });

            // Pause/Play timeline based on page
            if (targetId === "kenangan") {
                if (mainTimeline) mainTimeline.play();
            } else {
                if (mainTimeline) mainTimeline.pause();
            }
        });
    });

    // === KENANGAN ANIMATION LOGIC ===
    const photoContainer = document.getElementById("photo-container");
    const progressBar = document.getElementById("progress-bar");
    const timeIndicator = document.getElementById("time-indicator");
    
    // Configuration
    const totalPhotos = 100;
    const durationPerPhoto = 2.5; // in seconds
    const overlap = 0.5; // crossfade duration
    
    // Generate Photo Elements
    const photos = [];
    for (let i = 0; i < totalPhotos; i++) {
        const img = document.createElement("img");
        img.className = "memory-photo";
        // Using unspalsh random with keyword 'indonesia,people,village' for variety
        // Add random seed to avoid caching same image
        img.src = `https://source.unsplash.com/random/1920x1080/?indonesia,village,people&sig=${i}`;
        photoContainer.appendChild(img);
        photos.push(img);
    }

    // Wait a brief moment for some images to start loading (in real app, preload them)
    // GSAP Timeline
    let mainTimeline = gsap.timeline({
        paused: true,
        repeat: -1, // loop endlessly
        onUpdate: updateProgress
    });

    function buildTimeline() {
        photos.forEach((photo, index) => {
            // Animation for each photo
            const t = gsap.timeline();
            
            // Fade in and scale (Ken Burns Effect)
            t.fromTo(photo, 
                { opacity: 0, scale: 1 }, 
                { opacity: 1, scale: 1.1, duration: overlap, ease: "power1.inOut" }
            )
            // Hold and continue scale
            .to(photo, 
                { scale: 1.15, duration: durationPerPhoto - overlap, ease: "none" }
            )
            // Fade out
            .to(photo, 
                { opacity: 0, scale: 1.2, duration: overlap, ease: "power1.inOut" }
            );

            // Add to main timeline with overlap
            const position = index * (durationPerPhoto - overlap);
            mainTimeline.add(t, position);
        });
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateProgress() {
        const progress = mainTimeline.progress();
        progressBar.style.width = `${progress * 100}%`;
        
        const current = mainTimeline.time();
        const total = mainTimeline.duration();
        timeIndicator.innerText = `${formatTime(current)} / ${formatTime(total)}`;
    }

    // Initialize
    buildTimeline();
});
