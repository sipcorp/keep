$(document).ready(function () {


    $("#news-slider11").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [980, 2],
        itemsMobile: [600, 1],
        pagination: true,
        autoPlay: true
    });



    var sliding = false,
        curSlide = 1,
        numOfSlides = $(".slider--el").length;
    function loopSlider() {
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

    setInterval(loopSlider,5000)

});

