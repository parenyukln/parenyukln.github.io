var firstAnchorLoad = true;
var preloaderHadHide = false;
var fourOwlCarouselChangeDirection = '';
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

$(document).ready( function() {
    window.sr = ScrollReveal();
    
    fullpageInit();
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

    var resizeId;
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 1000);
    });

    function doneResizing(){
        $('.owl-carousel').trigger('destroy.owl.carousel');
        $.fn.fullpage.reBuild();
        initSliders();
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
            $('.menu-mobile').click();
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

    $('#vacancies__form').submit( function(e) {
        e.preventDefault();
        $(this).addClass('hidden'); 
        $('.vacancies__form .form__success').removeClass('hidden'); 
    });

    $('.registration__cancel a').click( function(e) {
        e.preventDefault();
        $('.overlay').addClass('hidden');
        $('.registration__form').removeClass('registration__form--active');  

        setTimeout(function() {
            $('.registration__form').addClass('hidden');  
        }, 501);
    });

    $('.vacancies__cancel a').click( function(e) {
        e.preventDefault();
        $('.overlay').addClass('hidden');
        $('.vacancies__form').removeClass('vacancies__form--active');  

        setTimeout(function() {
            $('.vacancies__form').addClass('hidden');  
        }, 501);
    });

    $('#new__product-btn').click( function(e) {
        e.preventDefault();
        $('.overlay').removeClass('hidden');
        $('.registration__form').removeClass('hidden');
 
        setTimeout(function() {
            $('.registration__form').addClass('registration__form--active');
        }, 100); 
    });

    $('#meet__team-btn').click( function(e) {
        e.preventDefault();
        $('.overlay').removeClass('hidden');
        $('.vacancies__form').removeClass('hidden');
 
        setTimeout(function() {
            $('.vacancies__form').addClass('vacancies__form--active');
        }, 100); 
    });

    $('.file__input').click( function(e) {
        e.preventDefault();
        $('#file').click();
    });

    $('.registration__form .checkbox__container, .contact__form .checkbox__container, .vacancies__form .checkbox__container').click( function() {
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

    $('.slide__four-header').delegate('.header__nav-item', 'click', function(e) {
        e.preventDefault();
        const thisDataCat = $(this).data('cat');
        const thisDataIndex = Number($(this).data('index'));

        if ( $('.slide__four-header .header__nav-item.active').data('cat') === thisDataCat ) {
            return;
        }
        
        $('.slide__four-header .header__nav-item.active').removeClass('active');
        $('.slide__four .solition__wrapper.owl-carousel').trigger('to.owl.carousel', [thisDataIndex , 0]);
        $(`.slide__four-header .header__nav-item[data-cat=${thisDataCat}]`).addClass('active');
    });

    $('.slide__six-header .header__item-link').click( function(e) {
        e.preventDefault();
        $('.slide__six-header .header__item').removeClass('header__item--active');
        const parentElement = $(this).parent().parent();
        $('.slide__six .slide__six-main.owl-carousel').trigger('to.owl.carousel', parentElement.index(), 1000);
        $('.slide__six .slide__six-header.owl-carousel').trigger('to.owl.carousel', parentElement.index(), 1000);
        parentElement.find('.header__item').addClass('header__item--active');
    });

    var $pagesArr = $$('.fb-page');  
    var numOfPages = $pagesArr.length;

    $pagesArr.forEach(function($page, i) {
      var progressStep = i / (numOfPages - 1);
      $page.dataset.progress = progressStep;
    });
});

function checkScroll() {
    /*const widthMustBe = $(window).height();
    const widthInFact = Math.max.apply(Math, $('.content__slide').map(function(){ return $(this).height(); }).get());
    
    if (widthInFact > widthMustBe) {
        $.fn.fullpage.setAutoScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false, 'down, up'); 
        $('body').children().not('#fullpage').css('position', 'fixed');
    } else {
        $.fn.fullpage.setAutoScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true, 'down, up');
        $('body').children().not('#fullpage').css('position', 'absolute');
    }*/
}

function fullpageInit() {
  // Fullpage init
	$('#fullpage').fullpage({
        anchors: ['home', 'technologies', 'platform', 'solutions', 'team', 'contacts'],
        lazyLoading: true,
        css3: false,
        resize: true,
        touchSensitivity: 20,
        scrollOverflow: false,
        animateAnchor: false,
        scrollOverflowReset: true,
        fitToSection: false,
        recordHistory: false,
        afterLoad: function(origin, destination, direction) {
            let timeout = 500;
            setTimeout(function() {
                $('#fullpage > .opacity-0, body > .opacity-0:not(".loading__dontshow")').removeClass('opacity-0'); 
                if ( firstAnchorLoad ) {
                    $('.owl-carousel').trigger('destroy.owl.carousel');
                    $.fn.fullpage.reBuild();
                    initSliders();  
                    firstAnchorLoad = false;         
                }                      
            }, timeout);
        },
        onLeave: function(origin, destination, direction) {
            let timeout = 510;
            if (direction === 'up') {
                timeout = 150;
            }
                
            if ( firstAnchorLoad ) {
                timeout = 0;            
            }

            setTimeout(function() {
                changeSlide(destination, false, origin);
                $('#fullpage > .opacity-0, body > .opacity-0:not(".loading__dontshow")').removeClass('opacity-0');
                
                if (direction === 'up') {
                    setTimeout(function() {
                        $('.sub__point-animate').removeClass('sub__point-animate');
                    }, 500);
                } else if (direction === 'down') {
                    $('.sub__point-animate').removeClass('sub__point-animate');
                }
            }, timeout);

            doAsidePointsAnimation(origin, destination, direction);
            doAnimation(destination);    
        },
    });
}

function changeSlide(slideNumber, doMove = true, fromSlideNumber) {
    const DEFAULT_SLIDE_TIME = 1;
    if (document.querySelector('.header__link-active') !== null) {
        $('.header__link-active').removeClass('header__link-active');
    }

    $('.main__point .point__left').text('');
    document.querySelectorAll('.main__point .point__right').forEach( function(item,i) {
        const text = i + 1;
        item.innerHTML = '0' + text.toString();
    });

    const currentPageNumber = slideNumber.toString();
    const currentPageText = $('.content__slide').eq(slideNumber).data('translate');

    if (slideNumber === 1) {
        setTimeout(lightSlide, DEFAULT_SLIDE_TIME);
    } else if (slideNumber === 2) {
        setTimeout(darkSlide, DEFAULT_SLIDE_TIME);
    } else if (slideNumber === 3) {
        setTimeout(lightSlide, DEFAULT_SLIDE_TIME);
    } else if (slideNumber === 4) {
        setTimeout(darkSlide, DEFAULT_SLIDE_TIME);
    } else if (slideNumber === 5) {
        setTimeout(lightSlide, DEFAULT_SLIDE_TIME);
    } else if (slideNumber === 6) {
        setTimeout(darkSlide, DEFAULT_SLIDE_TIME);
    }

    $('.main__point-active .point__left').text('0' + currentPageNumber);
    $('.main__point-active .point__right').text(currentPageText);
    $('.point__left.opacity-0, .point__right.opacity-0').removeClass('opacity-0');

    if (doMove) {
        $.fn.fullpage.silentMoveTo(slideNumber);
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

    if (isIE || isEdge) {
        $('.header').addClass('header-dark');
        $('.main__aside').addClass('aside-dark');
    }
}

function lightSlide() {
    // Меняем цвет
    $('.header .cl-black').removeClass('cl-black').addClass('cl-white')

    // Меняем картинку логотипа
    document.querySelector('.logo__link img').src = './static/images/mircod_logo_white.png';

    if (isIE || isEdge) {
        $('.header').removeClass('header-dark');
        $('.main__aside').removeClass('aside-dark');
    }
}

function hidePreloader() {
    if (!preloaderHadHide) {
        preloaderHadHide = true;
        initSliders();
        $('#fullpage > .hidden, body > .hidden:not(".loading__dontshow")').removeClass('hidden');
    
        setTimeout(function() {
            $('.slide__loading').addClass('hidden');
            sr.reveal('.footer__wrapper', {
                duration   : 600,
                distance   : '100px',
                easing     : 'ease-out',
                origin     : 'bottom',
                scale      : 1,
                viewFactor : 0,
                delay: 50
            });
        }, 500);
    } 
}

function initMap() {
    let markerDirection = './static/images/slide_six/m.png';
    if ( $(window).width() <= 600 ) {
        markerDirection = './static/images/slide_six/m-48.png';
    }
    var kazanCoordinates = {lat: 55.8020059, lng: 49.1175269},
        moscowCoordinates = {lat: 55.6938141, lng: 37.3390018},
        canadaCoordinates = {lat: 43.7687117, lng: -79.4765708},
        statesCoordinates = {lat: 26.355489, lng: -80.0877275},
        mapMarkerIcon = markerDirection,
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

        $('.google__map').on('touchstart', function() {
            $('.google__map .gm-style .gm-style-pbc ~ div').hide();
        });

        $('.google__map').on('touchend', function() {
            $('.google__map .gm-style .gm-style-pbc ~ div').show();
        });
}

function doAnimation(destination) {
     // Анимации по слайдам
     if (destination === 3) {
        setTimeout(function() {
            $('.slide__three-main').removeClass('animation-from-left');
        }, 200);
    }

    if (destination === 5) {
        const defaultTimeout = 300;
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
            nav: true,
            smartSpeed: 1000,
            navText: ["<img src='./static/images/prev.png' class='filter--color' alt='Left arrow'>","<img src='./static/images/next.png' class='filter--color' alt='Right arrow'>"],
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

    $('.slide__four .solition__wrapper.owl-carousel').owlCarousel({
        dots: false,
        nav: true,
        smartSpeed: 1000,
        loop: true,
        navText: ["<img src='./static/images/prev.png' alt='Left arrow'>","<img src='./static/images/next.png' alt='Right arrow'>"],
        center: true,
        responsive: { 
            0: {
                items: 1
            },
            960: {
                items: 3
            }
        }
    });

    $('.slide__four .header__nav.owl-carousel').owlCarousel({
        dots: false,
        nav: true,
        smartSpeed: 1000,
        navText: ["<img src='./static/images/prev.png' alt='Left arrow'>","<img src='./static/images/next.png' alt='Right arrow'>"],
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        center: true,
        responsive: { 
            0: {
                items: 2
            },
            480: {
                items: 3,
                margin: 100
            },
            960: {
                items: 5,
                margin: 150,
                autoWidth: true
            }
        }
    });

    // Slide six
    $('.slide__six .slide__six-main.owl-carousel').owlCarousel({
        smartSpeed: 500,
        dots: false,
        nav: true,
        mouseDrag: false,
        touchDrag: false,
        navText: ["<img src='./static/images/prev.png' alt='Left arrow'>","<img src='./static/images/next.png' alt='Right arrow'>"],
        responsive: { 
            0: {
                items:1
            }
        }
    });

    $('.slide__six .slide__six-header.owl-carousel').owlCarousel({
        smartSpeed: 500,
        dots: false,
        nav: false,
        mouseDrag: false,
        touchDrag: false,
        center: true,
        responsive: { 
            0: {
                items: 3,
                margin: 50
            },
            480: {
                items: 3,
                margin: 150
            },
            960: {
                items: 7
            }
        }
    });

    $('.slide__four .slide__four-main.owl-carousel, .slide__four .solition__wrapper.owl-carousel').on('changed.owl.carousel next.owl.carousel prev.owl.carousel change.owl.carousel', function(event) {
        event.stopPropagation();
    });

    $('.slide__four .solition__wrapper.owl-carousel').on('changed.owl.carousel', function(event) {    
        const slideIndex = event.item.index;
        const currentCarouselItemDataCat = $('.slide__four .solition__wrapper.owl-carousel .owl-item').eq(slideIndex).find('.slide__four-solution').data('cat');
        const currentHeaderItemDataCat = $(`.slide__four .header__nav-item.active`).data('cat');
        
        if (currentCarouselItemDataCat !== currentHeaderItemDataCat) {
          $('.slide__four-header .header__nav-item.active').removeClass('active');
          $(`.slide__four-header .header__nav-item[data-cat=${currentCarouselItemDataCat}]`).addClass('active');   
            $('.slide__four .header__nav').trigger('to.owl.carousel', [$('.slide__four-header .header__nav-item.active').data('header'), 1000]);            
        }  
    });

    $('.slide__four .header__nav.owl-carousel .owl-nav .owl-next').off('click');
    $('.slide__four .header__nav.owl-carousel .owl-nav .owl-prev').off('click');

    $('.slide__four .header__nav.owl-carousel .owl-nav .owl-next').click(function(e) {
        e.stopPropagation();
        const lastCarouselIndex = Number($('.slide__four .header__nav').data('last'));
        const thisHeaderItemActiveDataIndex = Number($('.slide__four .header__nav-item.active').data('index'));
        let headerItem;
        fourOwlCarouselChangeDirection = 'next';
        headerItem = $(`.slide__four .header__nav-item[data-index=${thisHeaderItemActiveDataIndex}]`).parent().next().find('.header__nav-item');          
        headerItem.click();
    });

    $('.slide__four .solition__wrapper.owl-carousel .owl-nav .owl-prev').click(function(e) {
        e.stopPropagation();
        fourOwlCarouselChangeDirection = 'prev';
    });

    $('.slide__four .solition__wrapper.owl-carousel .owl-nav .owl-next').click(function(e) {
        e.stopPropagation();
        fourOwlCarouselChangeDirection = 'next';
    });

    $('.slide__four .header__nav.owl-carousel .owl-nav .owl-prev').click(function(e) {
        e.stopPropagation();
        const lastCarouselIndex = Number($('.slide__four .header__nav').data('last'));
        const thisHeaderItemActiveDataIndex = Number($('.slide__four .header__nav-item.active').data('index'));
        let headerItem;
        fourOwlCarouselChangeDirection = 'prev';
        headerItem = $(`.slide__four .header__nav-item[data-index=${thisHeaderItemActiveDataIndex}]`).parent().prev().find('.header__nav-item');          
        headerItem.click();
    });

    $('.slide__six .owl-carousel').on('changed.owl.carousel', function(event) {
        const slideIndex = event.item.index;
        $('.slide__six-header .header__item-link').eq(slideIndex).click();
    });
}

function doAsidePointsAnimation(fromSlideNumber, toSlideNumber, diraction) { 
    var $this = document.querySelectorAll('.main__point')[toSlideNumber-1];
    var $dragCont = $$('.fb-cont__drag-cont');
    var $activePage = $$('.fb-active-page');
    var pageColors = {
        default: '#0f33ff'
    }
    var animTime = diraction === 'up' ? 0.4 : 0.7;
    var progressTo = +$this.dataset.progress;
    var type = $this.dataset.page;
    var bgColor = pageColors[type];
    if (!bgColor) bgColor = pageColors.default;
    
    $('.main__point-active .point__left, .main__point-active .point__right').addClass('opacity-0');
    $('.main__point-active').removeClass('main__point-active');
    document.querySelectorAll('.main__point')[toSlideNumber-1].classList.add('main__point-active');
    $('.main__point-active .point__left, .main__point-active .point__right').addClass('opacity-0');
    $$('.fb-page.s--active').classList.remove('s--active');
    $this.classList.add('s--active');
    
    TweenMax.to($activePage, animTime, {backgroundColor: bgColor});
    TweenMax.to($dragCont, animTime, {y: progressTo * 100 + '%'});

    $('.fb-active-page').css('margin-top', `-${toSlideNumber/2}px`);
}

function $$(selector, context) {
    var context = context || document;
    var elements = context.querySelectorAll(selector);
    var nodesArr = [].slice.call(elements);
    return nodesArr.length === 1 ? nodesArr[0] : nodesArr;
};
  