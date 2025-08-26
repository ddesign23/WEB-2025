document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    

    if (isMobile) {
        const center2 = document.querySelector(".center2");
        const photos = Array.from(document.querySelectorAll(".center2 .photo-v"));
        const blurredBackground = document.querySelector(".blurred-background");
        const sectionTitle = document.querySelector(".section-title");
        const description = document.querySelector(".description");
        const tags = document.querySelectorAll(".tag");
        const button = document.getElementById("go-to-project");


        // Project data for the photos
        const projectData = [
            { title: "Chillz", tags: ["Branding", "Prototypes"], description: "Exciting platform offering personalized entertainment options." },
            { title: "Maire et Citoyeens", tags: ["Branding", "UX Design"], description: "An intuitive app that helps manage your community efficiently." },
            { title: "My Accountant Online", tags: ["FinTech", "App Design"], description: "Whether you're looking for a free account with news, agenda and a complete presentation of your commune, or a premium account with all the features available à la carte, don't wait any longer to bring your commune into the digital age." },
            { title: "Toops", tags: ["Gaming", "Prototypes"], description: "Next-generation gaming designs for immersive experiences." },
            { title: "Rekit", tags: ["Sustainability", "Development"], description: "Smart tools redefining sustainability and eco-friendly solutions." },
            { title: "Le Parissian", tags: ["Sustainability", "Development"], description: "Smart tools redefining sustainability and eco-friendly solutions." },
            { title: "Biyon", tags: ["FinTech", "App Design"], description: "Effortless finances, seamless success with a smart money app." },
            { title: "Say Cheeese", tags: ["Gaming", "Prototypes"], description: "Next-generation gaming designs for immersive experiences." },
            { title: "Blackbox", tags: ["Sustainability", "Development"], description: "Smart tools redefining sustainability and eco-friendly solutions." },
            { title: "Himalight", tags: ["Sustainability", "Development"], description: "Smart tools redefining sustainability and eco-friendly solutions." },
            { title: "Sbc", tags: ["Sustainability", "Development"], description: "Smart tools redefining sustainability and eco-friendly solutions." },
            { title: "Francis", tags: ["FinTech", "App Design"], description: "Effortless finances, seamless success with a smart money app." },
            { title: "Virtual Soul", tags: ["Gaming", "Prototypes"], description: "Next-generation gaming designs for immersive experiences." },
            { title: "Marco Amari", tags: ["Sustainability", "Development"], description: "Smart tools redefining sustainability and eco-friendly solutions." },
        ];
    
        // Debug: Check the setup
        if (!center2 || photos.length === 0 || !blurredBackground) {
            console.error("Required elements not found for mobile layout!");
            return;
        }

        // Clone photos for seamless scrolling
        const clonePhotos = () => {
            const firstClone = photos.map(photo => photo.cloneNode(true));
            const lastClone = photos.map(photo => photo.cloneNode(true));
            firstClone.forEach(clone => center2.append(clone));
            lastClone.reverse().forEach(clone => center2.prepend(clone));
        };

        clonePhotos();

        const allPhotos = Array.from(center2.querySelectorAll(".photo-v")); // Includes clones
        const originalPhotosCount = photos.length;

        // Set initial scroll position
        center2.scrollLeft = photos[0].offsetWidth * originalPhotosCount;


    // Update content dynamically
    const updateContent = (index) => {
        const project = projectData[index % projectData.length];
        if (!project) return;

        sectionTitle.textContent = project.title;
        description.textContent = project.description;

        tags.forEach((tag, i) => {
            tag.textContent = project.tags[i] || "";
            tag.style.display = project.tags[i] ? "inline-block" : "none";
        });

        // Update button action
        button.setAttribute("onclick", `location.href='${project.link}'`);
    };

        // Update active photo and blurred background
        const updateActivePhoto = () => {
            const viewportCenter = center2.offsetWidth / 2;
            let closestPhoto = null;
            let minDistance = Infinity;

            allPhotos.forEach((photo, index) => {
                const rect = photo.getBoundingClientRect();
                const photoCenter = rect.left + rect.width / 2;
                const distance = Math.abs(viewportCenter - photoCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestPhoto = { photo, index };
                }

                photo.classList.toggle("active", distance < rect.width / 2);
            });

            if (closestPhoto) {
                const { photo, index } = closestPhoto;

                // Update content
                updateContent(index % originalPhotosCount);

                // Update blurred background
                const imgSrc = photo.querySelector("img").src;
                blurredBackground.style.backgroundImage = `url(${imgSrc})`;


            }
        };

        // Seamless infinite scrolling
        const resetScrollPosition = () => {
            const photoWidth = photos[0].offsetWidth;
            if (center2.scrollLeft >= photoWidth * originalPhotosCount * 2) {
                center2.scrollLeft = photoWidth * originalPhotosCount;
            } else if (center2.scrollLeft <= 0) {
                center2.scrollLeft = photoWidth * originalPhotosCount;
            }
        };

        // Add scroll event listener
        center2.addEventListener("scroll", () => {
            resetScrollPosition();
            updateActivePhoto();
        });

        // Initialize
        updateActivePhoto();
    }
   
});