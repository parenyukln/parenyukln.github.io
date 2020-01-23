// Темная тема
const THEME_STYLE = 'dark';

$(document).ready(function() {
    // Fullpage init
	$('#fullpage').fullpage({
		//scrollOverflow: true,
        normalScrollElementTouchThreshold: 1,
        lazyLoading: true,
        loopTop: true,
        loopBottom: true,
        onLeave: function(origin, destination, direction) {
            changeSlide(destination, false);
        }
    });
    
    // Preloader 
    var preloader    = $('.slide__loading'), // селектор прелоадера
        imagesCount  = $('img').length, // количество изображений
        dBody        = $('body'), //обращаемся к body
        percent      = Math.round(100 / imagesCount), // количество % на одну картинку
        progress     = 0, // точка отсчета
        imgSum       = 5, // количество картинок
        loadedImg    = 0; // счетчик загрузки картинок

    if (imagesCount >= imgSum && imagesCount > 0) {
        for (var i = 0; i < imagesCount; i++) { // создаем клоны изображений
            var img_copy        = new Image();
            img_copy.src        = document.images[i].src;
            img_copy.onload     = img_load;
            img_copy.onerror    = img_load;
        }

        function img_load () {
            progress += percent;
            loadedImg++;
            if (progress >= 99 || loadedImg == imagesCount) {
                preloader.delay(400).fadeOut('slow', hidePreloader);
            }
            if (progress < 10) {
                $(".loading__spinner span").text('0' + progress); 
            } else if (progress < 99) {
                $(".loading__spinner span").text(progress);
            } 
        }
    } else {
        hidePreloader();
    }

    // Owl carousel
    // Mobile
    if ( $(window).width() <= 960 ) {
        // Slide one
        $('.slide__one .owl-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            autoplayTimeout: 5000,
            responsive: { 
                0: {
                    items:1
                },
                600: {
                    items:2
                },
                1000: {
                    items:4
                }
            }
        });

        // Slide three
        $('.slide__three .owl-carousel').owlCarousel({
            dots: false,
            responsive: { 
                0: {
                    items:1
                },
                600: {
                    items:2
                },
                1000: {
                    items:4
                }
            }
        });
    }

     // Slide four
     $('.slide__four .owl-carousel').owlCarousel({
        dots: false,
        responsive: { 
            0: {
                items:1
            }
        }
    });
    

    // Events
    $('.next__slide-arrow').click( function(e) {
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    });

    $('.slide__two .description__wrapper-img').click( function() {
        const wrapper = $(this).parents('.description__wrapper');

        if (wrapper.hasClass('description__wrapper--active')) {
            return;
        }

        $('.slide__two .description__wrapper--active').removeClass('description__wrapper--active');
        wrapper.addClass('description__wrapper--active');
    });

    $('.header__email').click( function(e) {
        e.preventDefault();
        $('.overlay').removeClass('hidden');
        $('.contact__form').removeClass('hidden');
        
        setTimeout(function() {
            $('.contact__form').addClass('contact__form--active');
        }, 100); 
    });

    $('.contact__cancel a').click( function(e) {
        e.preventDefault();
        $('.overlay').addClass('hidden');
        $('.contact__form').removeClass('contact__form--active'); 

        setTimeout(function() {
            $('.contact__form').addClass('hidden'); 
        }, 501);  
    });

    $('.header__search-block').click( function(e) {
        e.preventDefault();
        $('.overlay').removeClass('hidden');
        $('.search__form').removeClass('hidden');

        setTimeout(function() {
            $('.search__form').addClass('search__form--active');
        }, 100); 
    });

    $('.search__cancel a').click( function(e) {
        e.preventDefault();
        $('.overlay').addClass('hidden');
        $('.search__form').removeClass('search__form--active');  

        setTimeout(function() {
            $('.search__form').addClass('hidden');  
        }, 501);
    });

    $('.search__result-wrapper').on('mousewheel', function(e) {
        e.stopPropagation();
    });

    if (THEME_STYLE === 'light') {
        darkSlide();
    } 

    $('.header__link').removeClass('header__link-active');

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

    $('.logo__link').click( function(e) {
        e.preventDefault();
        changeSlide(1);
    });

    $('#registration__form').submit( function(e) {
        e.preventDefault();
        $(this).addClass('hidden'); 
        $('.registration__form .form__success').removeClass('hidden'); 
    });

    $('#contact__form').submit( function(e) {
        e.preventDefault();
        $(this).addClass('hidden'); 
        $('.contact__form .form__success').removeClass('hidden'); 
    });

    $('.registration__cancel a').click( function(e) {
        e.preventDefault();
        $('.overlay').addClass('hidden');
        $('.registration__form').removeClass('registration__form--active');  

        setTimeout(function() {
            $('.registration__form').addClass('hidden');  
        }, 501);
    });

    $('.header__button-create').click( function(e) {
        e.preventDefault();
        $('.overlay').removeClass('hidden');
        $('.registration__form').removeClass('hidden');
 
        setTimeout(function() {
            $('.registration__form').addClass('registration__form--active');
        }, 100); 
    });

    $('.registration__form .checkbox__container, .contact__form .checkbox__container').click( function() {
        $(this).prev().click();
    });

    $('.menu-mobile').click( function(e) {
        e.preventDefault();
        const mobileMenuElement = $('.mobile__menu');

        if (mobileMenuElement.hasClass('hidden')) {
            mobileMenuElement.removeClass('hidden');
            $('.header').addClass('filter--color');
        } else {
            mobileMenuElement.addClass('hidden');
            $('.header').removeClass('filter--color');
        } 
    });
});

function changeSlide(slideNumber, doMove = true) {
    const DEFAULT_SLIDE_TIME = 1;
    if (document.querySelector('.header__link-active') !== null) {
        $('.header__link-active').removeClass('header__link-active');
    }
    
    $('.main__point-active').removeClass('main__point-active');
    document.querySelectorAll('.main__point')[slideNumber-1].classList.add('main__point-active');
    $('.main__point .point__left').text('');
    document.querySelectorAll('.main__point .point__right').forEach( function(item,i) {
        const text = i + 1;
        item.innerHTML = '0' + text.toString();
    });

    const currentPageNumber = slideNumber.toString();
    let currentPageText = 'Главная';

    if (slideNumber === 1) {
        setTimeout(lightSlide, DEFAULT_SLIDE_TIME);
    } else if (slideNumber === 2) {
        setTimeout(darkSlide, DEFAULT_SLIDE_TIME);
        currentPageText = 'Технологии';
    } else if (slideNumber === 3) {
        setTimeout(lightSlide, DEFAULT_SLIDE_TIME);
        currentPageText = 'Платформа';
    } else if (slideNumber === 4) {
        setTimeout(darkSlide, DEFAULT_SLIDE_TIME);
        currentPageText = 'Решения';
    } else if (slideNumber === 5) {
        setTimeout(lightSlide, DEFAULT_SLIDE_TIME);
        currentPageText = 'Команда';
    } else if (slideNumber === 6) {
        setTimeout(darkSlide, DEFAULT_SLIDE_TIME);
        currentPageText = 'Контакты';
    }

    $('.main__point-active .point__left').text('0' + currentPageNumber);
    $('.main__point-active .point__right').text(currentPageText);

    if (doMove) {
        $.fn.fullpage.moveTo(slideNumber);
    }

    if (slideNumber > 1) {
        $('.header .header__link')[slideNumber-2].classList.add('header__link-active');
        $('.mobile__menu .header__link')[slideNumber-2].classList.add('header__link-active');
    } 
}

function darkSlide() {
    // Меняем цвет
    $('.header .cl-white').removeClass('cl-white').addClass('cl-black');

    // Меняем картинку логотипа
    document.querySelector('.logo__link img').src = './static/images/mircod_logo_black.png';

    $('.header').addClass('header-dark');
    $('.main__aside').addClass('aside-dark');
}

function lightSlide() {
    // Меняем цвет
    $('.header .cl-black').removeClass('cl-black').addClass('cl-white')

    // Меняем картинку логотипа
    document.querySelector('.logo__link img').src = './static/images/mircod_logo_white.png';

    $('.header').removeClass('header-dark');
    $('.main__aside').removeClass('aside-dark');
}

function hidePreloader() {
    $('#fullpage > .hidden, body > .hidden:not(".loading__dontshow")').removeClass('hidden');
    $('.slide__loading').addClass('hidden');
}

function initMap() {
    var coordinates = {lat: 47.212325, lng: 38.933663},
        map = new google.maps.Map(document.getElementsByClassName('main__map')[0], {
            center: coordinates
        });
}