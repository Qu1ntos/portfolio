const element = document.querySelector(".mainContainer");

function updateSize() {
    const offset = (window.innerWidth + window.innerHeight) * 0.015;

    element.style.width = `${window.innerWidth - offset * 2}px`;
    element.style.height = `${window.innerHeight - offset * 2}px`;

    document.body.style.padding = `${offset}px`;
    document.body.style.margin = "0";
    document.documentElement.style.overflow = "hidden";
}

updateSize();
window.addEventListener("resize", updateSize);
