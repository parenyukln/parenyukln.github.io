
$(document).ready( function() {
    window.sr = ScrollReveal();

    // Fullpage init
	$('#fullpage').fullpage({
        normalScrollElementTouchThreshold: 1,
        lazyLoading: true,
        css3: true,
        onLeave: function(origin, destination, direction) {
            changeSlide(destination, false);
            doAnimation(destination);  
        }
    });
    
    // Preloader 
    let imagesCount  = $('img').length, // количество изображений
        percent      = Math.round(100 / imagesCount), // количество % на одну картинку
        progress     = 0, // точка отсчета
        imgSum       = 5, // количество картинок
        loadedImg    = 0; // счетчик загрузки картинок

    if (imagesCount >= imgSum && imagesCount > 0) {
        for (let i = 0; i < imagesCount; i++) { // создаем клоны изображений
            let img_copy        = new Image();
            img_copy.src        = document.images[i].src;
            img_copy.onload     = img_load;
            img_copy.onerror    = img_load;
        }

        function img_load () {
            progress += percent;
            loadedImg++;
            if (progress >= 99 || loadedImg == imagesCount) {
                hidePreloader();           
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

    $('.slide__four-header .header__nav-item').click( function(e) {
        e.preventDefault();
        $('.slide__four-header .header__nav-item').removeClass('header__nav-item--active');
        $('.slide__four .solition__wrapper.owl-carousel').trigger('to.owl.carousel', $(this).index());
        $(this).addClass('header__nav-item--active');
    });

    $('.slide__six-header .header__item-link').click( function(e) {
        e.preventDefault();
        $('.slide__six-header .header__item').removeClass('header__item--active');
        const parentElement = $(this).parent();
        $('.slide__six .owl-carousel').trigger('to.owl.carousel', parentElement.index());
        parentElement.addClass('header__item--active');
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
    initSliders();
    $('#fullpage > .hidden, body > .hidden:not(".loading__dontshow")').removeClass('hidden');
    $('#fullpage > .opacity-0, body > .opacity-0:not(".loading__dontshow")').removeClass('opacity-0');

    setTimeout(function() {
        $('.slide__loading').addClass('hidden');
        
        sr.reveal('.footer__wrapper', {
            duration   : 600,
            distance   : '100px',
            easing     : 'ease-out',
            origin     : 'bottom',
            reset      : true,
            scale      : 1,
            viewFactor : 0,
            delay: 50
        });
    }, 500);
    
}

function initMap() {
    var kazanCoordinates = {lat: 55.8020059, lng: 49.1175269},
        moscowCoordinates = {lat: 55.8761989, lng: 37.3036923},
        canadaCoordinates = {lat: 43.7687117, lng: -79.4765708},
        statesCoordinates = {lat: 26.355489, lng: -80.0877275},
        mapMarkerIcon = './static/images/slide_six/m.png',
        mapStyles = [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#dedede"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#d3d3d3"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#d3d3d3"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#d3d3d3"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#c9c9c9"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#c0c0c0"
                }
              ]
            }
        ],

        mapKazan = new google.maps.Map(document.getElementById('mapKazan'), {
            center: kazanCoordinates,
            zoom: 15,
            scrollwheel: false,
            disableDefaultUI: true
        }),

        markerKazan = new google.maps.Marker({
            position: kazanCoordinates,
            map: mapKazan,
            icon: mapMarkerIcon
        }),
        
        mapMoscow = new google.maps.Map(document.getElementById('mapMoscow'), {
            center: moscowCoordinates,
            zoom: 15,
            scrollwheel: false,
            disableDefaultUI: true
        }),

        markerMoscow = new google.maps.Marker({
            position: moscowCoordinates,
            map: mapMoscow,
            icon: mapMarkerIcon
        }),
        
        mapCanada = new google.maps.Map(document.getElementById('mapCanada'), {
            center: canadaCoordinates,
            zoom: 15,
            scrollwheel: false,
            disableDefaultUI: true
        }),

        markerCanada = new google.maps.Marker({
            position: canadaCoordinates,
            map: mapCanada,
            icon: mapMarkerIcon
        }),
        
        mapStates = new google.maps.Map(document.getElementById('mapStates'), {
            center: statesCoordinates,
            zoom: 15,
            scrollwheel: false,
            disableDefaultUI: true
        }),

        markerStates = new google.maps.Marker({
            position: statesCoordinates,
            map: mapStates,
            icon: mapMarkerIcon
        });

        mapKazan.setOptions({styles: mapStyles});
        mapMoscow.setOptions({styles: mapStyles});
        mapCanada.setOptions({styles: mapStyles});
        mapStates.setOptions({styles: mapStyles});
}

function doAnimation(destination) {
     // Анимации по слайдам
     if (destination === 3) {
        setTimeout(function() {
            $('.slide__three-main').removeClass('animation-from-left');
        }, 200);
    }

    if (destination === 5) {
        const defaultTimeout = 500;
        let intervalTimeout = 100;
        setTimeout(function() {
            $('.slide__five-wrapper .right__container').removeClass('animation-opacity');
            $('.slide__five-wrapper .left__container-item').each(function(i, item) {
                const $this = $(this);
                setTimeout(function() {
                    $this.removeClass('animation-from-left');
                }, intervalTimeout * $this.index());
            });
        }, defaultTimeout);
    }
}

function initSliders() {
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
    $('.slide__four .slide__four-main.owl-carousel').owlCarousel({
        dots: false,
        nav: true,
        navText: ['<', '>'],
        responsive: { 
            0: {
                items:1
            }
        }
    });

    $('.slide__four .solition__wrapper.owl-carousel').owlCarousel({
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        responsive: { 
            0: {
                items:1
            }
        }
    });

    // Slide six
    $('.slide__six .owl-carousel').owlCarousel({
        dots: false,
        nav: true,
        mouseDrag: false,
        touchDrag: false,
        navText: ['<', '>'],
        responsive: { 
            0: {
                items:1
            }
        }
    });

    $('.slide__four .slide__four-main.owl-carousel').on('changed.owl.carousel', function(event) {
        event.stopPropagation();
    });

    $('.slide__four .solition__wrapper.owl-carousel').on('changed.owl.carousel', function(event) {
        const slideIndex = event.item.index;
        $('.slide__four-header .header__nav-item').removeClass('header__nav-item--active');
        $('.slide__four-header .header__nav-item').eq(slideIndex).addClass('header__nav-item--active');
    });

    $('.slide__six .owl-carousel').on('changed.owl.carousel', function(event) {
        const slideIndex = event.item.index;
        $('.slide__six-header .header__item').removeClass('header__item--active');
        $('.slide__six-header .header__item-link').eq(slideIndex).parent().addClass('header__item--active');
    });
}