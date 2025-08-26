function fadeOutLoading(selector) {
  const loadingOverlay = document.querySelector(selector);
  if (loadingOverlay) {
    // Delay the fade-out process by 3 seconds
    setTimeout(() => {
      loadingOverlay.style.opacity = '0'; // Start fade-out
      setTimeout(() => {
        loadingOverlay.style.display = 'none'; // Hide completely after fade-out
      }, 2000); // Match the transition duration (2 seconds)
    }, 3000); // Add a 3-second delay before fade-out starts
  }
}

// Apply fade-out for both .iframe-loading and .iframe-loading-v
fadeOutLoading('.iframe-loading');
fadeOutLoading('.iframe-loading-v');
  document.addEventListener("DOMContentLoaded", () => {
    const pageContent = document.querySelector('.page-content');
  
    // Add a delay to ensure the animation is visible
    setTimeout(() => {
      pageContent.style.animation = 'smoothPop 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards';
  
      // Ensure the final state after the animation
      pageContent.addEventListener('animationend', () => {
        pageContent.classList.add('visible');
      });
    }, 100); // Adjust delay as needed
  });
  