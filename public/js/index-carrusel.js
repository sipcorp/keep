$(document).ready(function () {


    $("#news-slider11").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [980, 2],
        itemsMobile: [600, 1],
        pagination: true,
        autoPlay: true
    });



    var header = $('.main_banner ');

    var backgrounds = new Array(
        'url(img/2283.jpg)'
        , 'url(img/12785.jpg)');

    var current = 0;

    function nextBackground() {
        current++;
        current = current % backgrounds.length;
        header.css('background-image', backgrounds[current]);
    }
    setInterval(nextBackground, 5000);

    header.css('background-image', backgrounds[0]);


    var sliding = false,
        curSlide = 1,
        numOfSlides = $(".slider--el").length;
   

    function carusel(){
         if (sliding) return;
        sliding = true;
        $(".slider--el").show();
        $(".slider--el").css("top");
        $(".slider--el.active").addClass("removed");
        ($(this).hasClass("right")) ? curSlide++ : curSlide--;
        if (curSlide < 1) curSlide = numOfSlides;
        if (curSlide > numOfSlides) curSlide = 1;
        $(".slider--el-" + curSlide).addClass("next");

        setTimeout(function () {
            $(".slider--el.removed").hide();
            $(".slider--el").removeClass("active next removed");
            $(".slider--el-" + curSlide).addClass("active");
            sliding = false;
        }, 1800);
    }     
        setInterval(carusel, 5000);
});

