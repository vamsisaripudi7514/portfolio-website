document.addEventListener('DOMContentLoaded', () => {
  // Update footer year dynamically
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});