document.addEventListener("DOMContentLoaded", () => {
    const photoContainer = document.querySelector(".photo-container");
    const photos = Array.from(document.querySelectorAll(".photo"));
    const titles = document.querySelectorAll(".left-slot .title");
    const sectionTitle = document.querySelector(".section-title");
    const description = document.querySelector(".description");
    const tags = document.querySelectorAll(".tag");
    const blurredBackground = document.querySelector(".blurred-background");
 const verticalPhotos = document.querySelectorAll('.vertical-layout .photo');
    const viewportCenter = window.innerHeight / 2;
    const innerClose = document.querySelector("[data-close-overlay]");
  if (innerClose) innerClose.addEventListener("click", closeOverlay);

    const projectData = [
        { title: "Chillz", tags: ["Branding", "Prototypes"], description: "Exciting platform offering personalized options to find your match partner." },
        { title: "Maire et Citoyeens", tags: ["Branding", "UX Design"], description: "Whether you're looking for a free account with news, agenda and a complete presentation of your commune, or a premium account with all the features available à la carte, don't wait any longer to bring your commune into the digital age." },
        { title: "My Accountant Online", tags: ["FinTech", "App Design"], description: "A tool to manage all your finance easily and fast." },
        { title: "Toops", tags: ["Food", "Packaging"], description: "A heakthy snack made by dryed fruit, fun and funky." },
        { title: "Rekit", tags: ["Sustainability", "Photography"], description: "Smart tools redefining sustainability and eco-friendly solutions to preserve your vinyls discs." },
        { title: "Le Parissian", tags: ["Pastisserie", "Development"], description: "A powerful and luxury brand for those who search for a touch of Paris in Bangkok" },
        { title: "Biyon", tags: ["FinTech", "App Design"], description: "Effortless finances, seamless success with a smart crypto wallet." },
        { title: "Smart dress", tags: ["Fashion", "Prototype"], description: "Generate your daily outfit with all the clothes on your closet thenaks to the AI." },
        { title: "Blackbox", tags: ["Barbershop chain", "Prototypes", "Website design"], description: "A powerful website design for a powerful brand all around paris." },
        { title: "Himalight", tags: ["Health & Wellness ", "Branding", "Packaging"], description: "A brand created with the innovation of the CBD target to a powerful customer." },
        { title: "Sbc", tags: ["Fintech", "Prototypes", "Development"], description: "Smart tool to create a certificate for luxury items based on blockchain." },
        { title: "No Matter", tags: ["Branding", "App design"], description: "Private exclusive events around teh world based in paris." },
        { title: "Virtual Soul", tags: ["Social media", "Prototypes", "Branding"], description: "Life forever with your digital legacy on this powerful tool." },
        { title: "Marco Amari", tags: ["Jewellry", "Branding", "Packaging"], description: "Exquisite diamond jewelry, designed and made in the UAE for everyone, everywhere." },
    ];

    let currentIndex = 0;

    // Duplicate the photo list for infinite scrolling
    for (let i = 0; i < 4; i++) {
        photoContainer.append(...photos.map(photo => photo.cloneNode(true)));
        photoContainer.prepend(...photos.map(photo => photo.cloneNode(true)));
    }

    const containerHeight = photoContainer.scrollHeight / 3; // Middle section with original photos
    
    let scrollTimeout = null; // Timeout for debounce


    function setActivePhoto() {
        verticalPhotos.forEach((photo) => {
          const rect = photo.getBoundingClientRect();
          const photoCenter = rect.top + rect.height / 2;
    
          if (Math.abs(photoCenter - viewportCenter) < 100) {
            verticalPhotos.forEach((p) => p.classList.remove('active'));
            photo.classList.add('active');
          }
        });
      }
    
      window.addEventListener('scroll', () => setActivePhoto());
      setActivePhoto(); // Initialize the active photo

      
    function updateActivePhoto() {
        const photos = Array.from(document.querySelectorAll(".photo"));
        const viewportCenter = window.innerHeight / 2;
    
        let closestPhoto = null;
        let minDistance = Infinity;
    
        // Find the photo closest to the center of the viewport
        photos.forEach((photo) => {
            const photoRect = photo.getBoundingClientRect();
            const photoCenter = photoRect.top + photoRect.height / 2;
            const distanceFromCenter = Math.abs(viewportCenter - photoCenter);
    
            if (distanceFromCenter < minDistance) {
                minDistance = distanceFromCenter;
                closestPhoto = photo;
            }
        });
    
        // Center the closest photo (after scrolling stops)
        if (closestPhoto) {
            photos.forEach((photo) => photo.classList.remove("active"));
            closestPhoto.classList.add("active");
    
            const index = photos.indexOf(closestPhoto) % projectData.length;
            if (index !== currentIndex) {
                currentIndex = index;
                updateContent(currentIndex);
    
                // Update the blurred background
                const bgImage = closestPhoto.querySelector("img").src;
                blurredBackground.style.opacity = "0";
                blurredBackground.style.transform = "scale(1.05)";
                setTimeout(() => {
                    blurredBackground.style.backgroundImage = `url(${bgImage})`;
                    blurredBackground.style.opacity = "1";
                    blurredBackground.style.transform = "scale(1.1)";
                }, 450); // Sync with animation
            }
    
            // Scroll to align the photo with the center (after scrolling stops)
            const closestPhotoRect = closestPhoto.getBoundingClientRect();
            const offset = closestPhotoRect.top + closestPhotoRect.height / 2 - viewportCenter;
    
            window.scrollBy({
                top: offset,
                behavior: "smooth",
            });
            const event = new CustomEvent("photoChange", { detail: { index: currentIndex } });
            document.dispatchEvent(event);
        }
    }
    function scrollToPhoto(index) {
        const targetPhoto = photos[index];
        if (targetPhoto) {
            const offset = targetPhoto.offsetTop - window.innerHeight / 2 + targetPhoto.offsetHeight / 2;
            window.scrollTo({
                top: offset,
                behavior: "smooth",
            });
        }
    }
     // Listen for the custom event from iosPicker.js
    document.addEventListener("pickerChange", (event) => {
        const { index } = event.detail;
        scrollToPhoto(index); // Sync the carousel with the active title
    });

    // Initial setup
    scrollToPhoto(0); // Start at the first photo


    function updateContent(index) {
        const data = projectData[index];
        sectionTitle.textContent = data.title;
        description.textContent = data.description;

        tags.forEach((tag, i) => {
            tag.textContent = data.tags[i] || "";
            tag.style.display = data.tags[i] ? "inline-block" : "none";
        });

        titles.forEach((title, i) => {
            title.classList.toggle("active", i === index);
        });
    }

    function resetScroll() {
        const containerHeight = photoContainer.scrollHeight / 3; // Original photo list height
        const scrollY = window.scrollY;
        const scrollContainer = document.querySelector(".photo-container");
        scrollContainer.scrollTo(0, 0);
        document.body.scrollTo(0, 0); // Reset scroll to top
    
        // Reposition the scroll to the middle of the duplicated content when reaching the edges
        if (scrollY >= containerHeight * 2) {
            window.scrollTo({
                top: containerHeight,
                behavior: "instant", // Avoid noticeable jump
            });
        } else if (scrollY <= containerHeight / 3) {
            window.scrollTo({
                top: containerHeight,
                behavior: "instant",
            });
        }
    }

    
    function updatePhotoEffects() {
        const photos = Array.from(document.querySelectorAll(".photo"));
        const viewportCenter = window.innerHeight / 2;
    
        photos.forEach((photo) => {
            const photoRect = photo.getBoundingClientRect();
            const photoCenter = photoRect.top + photoRect.height / 2;
            const distanceFromCenter = Math.abs(viewportCenter - photoCenter);
            const maxDistance = window.innerHeight / 2; // Maximum distance for effects to apply
    
            // Calculate scale and opacity based on proximity to the center
            const scale = Math.max(0.8, 1 - (distanceFromCenter / maxDistance) * 0.2); // Between 0.8 and 1
            const opacity = Math.max(0.5, 0.68 - (distanceFromCenter / maxDistance) * 0.18); // Between 0.5 and 0.68
    
            // Apply the styles
            photo.style.transform = `scale(${scale})`;
            photo.style.opacity = opacity;
        });
    }
    
    


   // Debounced scroll event listener
   window.addEventListener("scroll", () => {
    resetScroll(); // Handle infinite scroll
    updatePhotoEffects(); // Update scaling and opacity
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActivePhoto, 150); // Debounced active photo update
});

    // Wait until scrolling has stopped
    scrollTimeout = setTimeout(() => {
        updateActivePhoto();
    }, 50); // Adjust debounce delay as needed

   
 // Initialize
updatePhotoEffects();
window.scrollTo(0, photoContainer.scrollHeight / 3); // St


// --- CONTACT OVERLAY (shared open/close) ---
const menuButton   = document.querySelector(".menu-button");
const menuOverlay  = document.querySelector(".menu-overlay");
const menuItems    = document.querySelectorAll(".menu-item");
const menuIcon     = document.querySelector(".menu-icon");
const closeIcon    = document.querySelector(".close-icon");

// Helpers: open / close
function openOverlay() {
  // mostrar overlay y activar transición
  menuOverlay.style.display = "flex";
  // usar rAF para asegurar que el browser aplica display antes de la clase
  requestAnimationFrame(() => {
    menuOverlay.classList.add("active");
  });
  if (menuIcon)  menuIcon.style.display  = "none";
  if (closeIcon) closeIcon.style.display = "block";
}

function closeOverlay() {
  menuOverlay.classList.remove("active");
  // anima items si los usas (opcional)
  menuItems.forEach((item) => {
    item.style.animation = "fadeOut 0.3s ease forwards";
  });
  setTimeout(() => {
    menuOverlay.style.display = "none";
    if (menuIcon)  menuIcon.style.display  = "block";
    if (closeIcon) closeIcon.style.display = "none";
  }, 300); // coincide con tu CSS de cierre
}

// Mobile button toggle (sigue funcionando igual)
if (menuButton) {
  menuButton.addEventListener("click", () => {
    const isActive = menuOverlay.classList.contains("active");
    if (isActive) {
      closeOverlay();
    } else {
      // si quieres animar entrada de items:
      menuItems.forEach((item, index) => {
        item.style.animation = `fadeIn 0.9s ease forwards`;
        item.style.animationDelay = `${index * 0.1}s`;
      });
      openOverlay();
    }
  });
}

// Cerrar si clicas fuera del contenido
menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) closeOverlay();
});

// --- HEADER "Contact" opens overlay ---
const headerContact = document.querySelector('a[data-open-contact], header .menu a[href="#contact"]');
if (headerContact) {
  headerContact.addEventListener("click", (e) => {
    e.preventDefault();  // no scroll a #contact
    openOverlay();
  });
}


// Close the menu when clicking outside the items
menuOverlay.addEventListener("click", (event) => {
    if (event.target === menuOverlay) {
        menuOverlay.classList.remove("active");
        menuItems.forEach((item) => {
            item.style.animation = "fadeOut 0.4s ease backwards";
        });
        setTimeout(() => {
            menuOverlay.style.display = "none";
            menuIcon.style.display = "block";
            closeIcon.style.display = "none";
        }, 400);
    }
});


});

document.addEventListener("DOMContentLoaded", () => {
    const photos = document.querySelectorAll(".photo");
    const button = document.getElementById("go-to-project");
    const viewportCenter = window.innerHeight / 2;

    // Function to find the active photo and update the button
    const updateActivePhoto = () => {
        let closestPhoto = null;
        let minDistance = Infinity;

        photos.forEach((photo) => {
            const rect = photo.getBoundingClientRect();
            const photoCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - photoCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestPhoto = photo;
            }
        });

        if (closestPhoto) {
            // Update the button's href attribute with the active photo's data-link
            const link = closestPhoto.getAttribute("data-link");
            button.setAttribute("onclick", `location.href='${link}'`);
        }
    };

    // Update the button when the user scrolls
    window.addEventListener("scroll", updateActivePhoto);

    // Initial update on page load
    updateActivePhoto();
});

window.addEventListener("load", () => {
    const preloader = document.querySelector('.preloader');
    const preloaderLogo = document.querySelector('.preloader-logo');
    const headerLogo = document.querySelector('.header-logo');
    const progressBar = document.querySelector('.progress-bar');

    // Check if the animation has already played
    const animationPlayed = localStorage.getItem('preloaderPlayed');

    if (!animationPlayed) {
        // Function to calculate translation offsets for the final animation
        const setAnimationTargets = () => {
            const headerLogoRect = headerLogo.getBoundingClientRect();
            const preloaderLogoRect = preloaderLogo.getBoundingClientRect();

            const translateX = headerLogoRect.left - preloaderLogoRect.left;
            const translateY = headerLogoRect.top - preloaderLogoRect.top;

            // Apply calculated transform values
            preloaderLogo.style.setProperty('--target-x', `${translateX}px`);
            preloaderLogo.style.setProperty('--target-y', `${translateY}px`);
        };

        // Trigger animations
        setTimeout(() => {
            setAnimationTargets();

            // Step 1: Start progress bar animation
            progressBar.classList.add('progress-complete');

            // Step 2: Move logo to header and fade background
            setTimeout(() => {
                preloaderLogo.classList.add('move-to-header');
                preloader.classList.add('fade-out');

                // Step 3: Smoothly show header logo
                setTimeout(() => {
                    headerLogo.style.display = 'block'; // Show header logo
                    headerLogo.style.opacity = '1';
                    headerLogo.style.transform = 'scale(1)';

                    // Save in localStorage to prevent reloading the preloader
                    localStorage.setItem('preloaderPlayed', 'true');
                }, 600); // Align with the CSS transition duration
            }, 3000); // Wait for progress bar to finish
        }, 500); // Initial preloader delay
    } else {
        // Skip preloader and display the header logo immediately
        preloader.style.display = 'none';
        headerLogo.style.display = 'block';
        headerLogo.style.opacity = '1';
        headerLogo.style.transform = 'scale(1)';
    }
});

document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;

  const href = a.getAttribute('href') || '';
  
  // excepciones (no interceptar estos)
  const isSpecial = /^(mailto:|tel:|sms:)/i.test(href);
  const isExternal = /^https?:\/\//i.test(href) && (new URL(href, location.href)).hostname !== location.hostname;
  const isWa = /(?:^https?:\/\/)?wa\.me\//i.test(href);
  if (isSpecial || isExternal || isWa || a.target === '_blank') return;

  // navegación interna
  const dest = new URL(a.href, location.href);
  const samePage = dest.pathname === location.pathname && dest.search === location.search && dest.hash === '';
  if (samePage) return;

  const pageTransition = document.querySelector('.page-transition');
  if (!pageTransition) return;

  e.preventDefault();
  pageTransition.classList.add('shrink');
  setTimeout(() => { window.location.href = dest.href; }, 800);
});

