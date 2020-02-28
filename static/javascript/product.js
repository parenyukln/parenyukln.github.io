var preloaderHadHide = false;
var COOCKIE_NAME = 'privacy_cookie';

$(document).ready( function() {
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
});

function hidePreloader() {
    if (!preloaderHadHide) {
        preloaderHadHide = true;
        $('#fullpage > .hidden, body > .hidden:not(".loading__dontshow")').removeClass('hidden');
    
        setTimeout(function() {
            $('.slide__loading').addClass('hidden');
            checkPrivacyCoockieState();
        }, 1000);
    } 
}

function checkPrivacyCoockieState() {
    if (!$.cookie(COOCKIE_NAME)) {
        $('.cookies__btn-wrapper button').click(function() {
            privacyCookiesAlert($('.cookies__attention'), false);
        });

        setTimeout(function() {
            privacyCookiesAlert($('.cookies__attention'), true);
        }, 1000);
    }
}

function privacyCookiesAlert(block, show) {
    if (show) {
        $('.overlay').addClass('bg-black').removeClass('hidden');
        block.removeClass('animation-from-bottom');
    } else {
        $('.overlay').addClass('hidden').removeClass('bg-black');
        block.addClass('animation-from-bottom');
        $.cookie(COOCKIE_NAME, '1', { expires: 365 });
    }
}