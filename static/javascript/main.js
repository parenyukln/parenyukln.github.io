// Темная тема
const THEME_STYLE = 'dark';

document.addEventListener("DOMContentLoaded", function(event) { 
    if (THEME_STYLE === 'light') {
        darkSlide();
    } 

    document.querySelector('.header__link').classList.remove('header__link-active');

    document.querySelectorAll('.header .header__link').forEach( function(item, i) {
        item.onclick = function(e) {
            e.preventDefault();
            changeSlide(i+2);
            this.classList.add('header__link-active');
        }
    });

    document.querySelectorAll('.mobile__menu .header__link').forEach( function(item, i) {
        item.onclick = function(e) {
            e.preventDefault();
            changeSlide(i+2);
            this.classList.add('header__link-active');
        }
    });

    document.querySelector('.logo__link').onclick = function(e) {
        e.preventDefault();
        changeSlide(1);
    }

    document.querySelector('#registration__form').onsubmit = function(e) {
        e.preventDefault();
        this.classList.add('hidden'); 
        document.querySelector('.registration__form .form__success').classList.remove('hidden'); 
    }

    document.querySelector('.registration__cancel a').onclick = function(e) {
        e.preventDefault();
        document.querySelector('.registration__form').classList.add('hidden'); 
    }

    document.querySelector('.header__button-create').onclick = function(e) {
        e.preventDefault();
        document.querySelector('.registration__form').classList.remove('hidden'); 
    }

    document.querySelectorAll('.registration__form .checkbox__container').forEach( function(item, i) {
        item.onclick = function() {
            this.previousElementSibling.click();
        }
    });

    document.querySelector('.menu-mobile').onclick = function(e) {
        e.preventDefault();
        const mobileMenuElement = document.querySelector('.mobile__menu');

        if (mobileMenuElement.classList.contains('hidden')) {
            mobileMenuElement.classList.remove('hidden');
            document.querySelector('.header').classList.add('filter--color');
        } else {
            mobileMenuElement.classList.add('hidden');
            document.querySelector('.header').classList.remove('filter--color');
        } 
    }
});

function changeSlide(slideNumber) {
    document.querySelectorAll('.content__slide').forEach( function(item, i) {
        item.classList.add('hidden');
    });

    if (document.querySelector('.header__link-active') !== null) {
        document.querySelector('.header__link-active').classList.remove('header__link-active');
    }
    
    document.querySelector('.main__point-active').classList.remove('main__point-active');
    document.querySelectorAll('.main__point')[slideNumber-1].classList.add('main__point-active');
    document.querySelectorAll('.main__point .point__left').forEach( function(item,i) {
        item.innerHTML = '';
    });
    document.querySelectorAll('.main__point .point__right').forEach( function(item,i) {
        const text = i + 1;
        item.innerHTML = '0' + text.toString();
    });

    if (slideNumber === 1) {
        lightSlide();
        document.querySelector('.slide__one').classList.remove('hidden');
        document.querySelector('.main__point-active .point__left').innerHTML = '01';
        document.querySelector('.main__point-active .point__right').innerHTML = 'Главная';
    } else if (slideNumber === 2) {
        darkSlide();
        document.querySelector('.slide__two').classList.remove('hidden');
        document.querySelector('.main__point-active .point__left').innerHTML = '02';
        document.querySelector('.main__point-active .point__right').innerHTML = 'Технологии';
    } else if (slideNumber === 3) {
        lightSlide();
        document.querySelector('.slide__three').classList.remove('hidden');
        document.querySelector('.main__point-active .point__left').innerHTML = '03';
        document.querySelector('.main__point-active .point__right').innerHTML = 'Платформа';
    } else if (slideNumber === 4) {
        darkSlide();
        document.querySelector('.slide__four').classList.remove('hidden');
        document.querySelector('.main__point-active .point__left').innerHTML = '04';
        document.querySelector('.main__point-active .point__right').innerHTML = 'Решения';
    } else if (slideNumber === 5) {
        lightSlide();
        document.querySelector('.slide__five').classList.remove('hidden');
        document.querySelector('.main__point-active .point__left').innerHTML = '05';
        document.querySelector('.main__point-active .point__right').innerHTML = 'Команда';
    } else if (slideNumber === 6) {
        darkSlide();
        document.querySelector('.slide__six').classList.remove('hidden');
        document.querySelector('.main__point-active .point__left').innerHTML = '06';
        document.querySelector('.main__point-active .point__right').innerHTML = 'Контакты';
    }
}

function darkSlide() {
    // Меняем цвет
    document.querySelectorAll('.cl-white').forEach( function(item, i) {
        item.classList.remove('cl-white');
        item.classList.add('cl-black');
    });

    // Меняем картинку логотипа
    document.querySelector('.logo__link img').src = './static/images/mircod_logo_black.png';

    document.querySelector('.header').classList.add('header-dark');
    document.querySelector('.main__aside').classList.add('aside-dark');
}

function lightSlide() {
    // Меняем цвет
    document.querySelectorAll('.cl-black').forEach( function(item, i) {
        item.classList.remove('cl-black');
        item.classList.add('cl-white');
    });

    // Меняем картинку логотипа
    document.querySelector('.logo__link img').src = './static/images/mircod_logo_white.png';

    document.querySelector('.header').classList.remove('header-dark');
    document.querySelector('.main__aside').classList.remove('aside-dark');
}