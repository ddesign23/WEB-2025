console.log("Responsive.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");

    const photoContainer = document.querySelector(".photo-container");
    if (!photoContainer) {
        console.error("Error: Photo container not found!");
        return;
    }

    console.log("Photo container:", photoContainer);

    const photos = Array.from(document.querySelectorAll(".photo"));
    if (photos.length === 0) {
        console.error("Error: No photos found!");
        return;
    }

    console.log("Photos found:", photos.length);

    function updateScrollBehavior() {
        if (window.innerWidth <= 768) {
            console.log("Switching to horizontal layout");
            photoContainer.style.flexDirection = "row";
            photoContainer.style.overflowX = "scroll";
            photoContainer.style.overflowY = "hidden";
            photoContainer.style.scrollSnapType = "x mandatory";

            photos.forEach((photo) => {
                console.log("Setting photo styles for horizontal layout");
                photo.style.width = "80vw";
                photo.style.minWidth = "300px";
                photo.style.height = "auto";
            });
        } else {
            console.log("Switching to vertical layout");
            photoContainer.style.flexDirection = "column";
            photoContainer.style.overflowX = "hidden";
            photoContainer.style.overflowY = "scroll";
            photoContainer.style.scrollSnapType = "y mandatory";

            photos.forEach((photo) => {
                console.log("Setting photo styles for vertical layout");
                photo.style.width = "100%";
                photo.style.minWidth = "0";
                photo.style.height = "100vh";
            });
        }
    }

    // Run on load
    updateScrollBehavior();

    // Reapply on window resize
    window.addEventListener("resize", updateScrollBehavior);
});