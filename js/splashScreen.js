setTimeout(() => {
    const splashScreen = document.getElementById('splash');
    splashScreen.classList.add('hidden');
}, 2000);

setTimeout(() => {
    const splashScreen = document.getElementById('splash');
    splashScreen.style.zIndex = -999;

}, 2500);

setTimeout(() => {
    document.querySelectorAll(".splash-screen p").forEach(p => {
        p.classList.add("hidden")
    });
}, 1000)