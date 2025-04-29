document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const targetId = event.target.getAttribute('data-target');
        const targetBlock = document.getElementById(targetId);

        const visibleBlock = document.querySelector('.content.fade-in');
        if (visibleBlock) {
            visibleBlock.classList.remove('fade-in');
            visibleBlock.classList.add('fade-out');
            setTimeout(() => {
                visibleBlock.style.display = 'none';

                if (targetBlock) {
                    targetBlock.style.display = 'block';
                    setTimeout(() => {
                        targetBlock.classList.remove('fade-out');
                        targetBlock.classList.add('fade-in');
                    }, 10);
                }
            }, 500); 
        } else {
            targetBlock.style.display = 'block';
            setTimeout(() => {
                targetBlock.classList.remove('fade-out');
                targetBlock.classList.add('fade-in');
            }, 10);
        }
    });
});