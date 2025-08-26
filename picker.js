const leftSlot = document.querySelector(".left-slot ul");
const titles = Array.from(document.querySelectorAll(".left-slot .title"));
const photos = Array.from(document.querySelectorAll(".photo"));

// Function to scroll the picker so the active title is centered
function scrollPickerToActiveTitle(index) {
    const activeTitle = titles[index];
    if (activeTitle) {
        const offset =
            activeTitle.offsetTop -
            leftSlot.offsetTop -
            leftSlot.clientHeight / 2 +
            activeTitle.clientHeight / 2;

        leftSlot.scrollTo({
            top: offset,
            behavior: "smooth", // Smooth scrolling
        });
    }
}
// Function to scroll to the corresponding photo
function scrollToPhoto(index) {
    const targetPhoto = photos[index];
    if (targetPhoto) {
        const offset =
            targetPhoto.offsetTop -
            window.innerHeight / 2 +
            targetPhoto.offsetHeight / 2;

        window.scrollTo({
            top: offset,
            behavior: "smooth",
        });

        // Highlight the clicked title
        highlightPickerTitle(index);
    }
}

// Function to highlight the active title
function highlightPickerTitle(index) {
    titles.forEach((title, i) => {
        title.classList.toggle("active", i === index);
    });
}

// Listen for the `photoChange` event and sync the picker
document.addEventListener("photoChange", (event) => {
    const { index } = event.detail;

    // Highlight and scroll to the active title
    highlightPickerTitle(index);
    scrollPickerToActiveTitle(index);
});


// Add click event listeners to all titles
titles.forEach((title, index) => {
    title.addEventListener("click", () => {
        scrollToPhoto(index);
    });
});