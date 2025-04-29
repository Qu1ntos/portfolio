document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('a[data-target="home"]');
    if (homeLink) {
        homeLink.click(); 
    }
});