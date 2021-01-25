// Прокрутка якорей
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();

        const blockId = anchor.getAttribute('href').substr(1);

        document.getElementById(blockId).scrollIntoView({
            behavior: 'smooth',
        })
    });
}


// Прилипающая шапка и scroll up
window.onscroll = () => {
    const header = document.querySelector('.list');
    const homeButt = document.getElementById('home-icon');
    const scrollUp = document.querySelector('.scroll-up');

    if (window.pageYOffset > 850) {
        header.classList.add('list-scroll');
        homeButt.classList.add('home-page--active');
        scrollUp.classList.add('scroll-up--active');
        
        scrollUp.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        });
    } else {
        header.classList.remove('list-scroll');
        homeButt.classList.remove('home-page--active');
        scrollUp.classList.remove('scroll-up--active')
    }
}
