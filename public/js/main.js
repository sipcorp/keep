$(document).ready(function () {
  $(".sidebar-dropdown > a").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });

  $("#close-sidebar").click(function () {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function () {
    $(".page-wrapper").addClass("toggled");
  });
  $("#sidebar-collapse-btn").on("click", function (e) {
    e.preventDefault(),
      $("#app").toggleClass("sidebar-open")
  })
  $("#sidebar-overlay").on("click", function () {
    $("#app").removeClass("sidebar-open")
  })

});
$(document).ready(function () {
  $("#modalOnLoad").modal('show');
  $('#modalOnLoad').modal('handleUpdate')
  $('.menu-movile, .overlay').click(function () {
    $('.menu-movile').toggleClass('clicked');
    
    $('#nav').toggleClass('show');
    
  });

});

// Scrolling Effect

// $(function() {
//   if ($("#sidebar-menu, #customize-menu").metisMenu({
//           activeClass: "open"
//       }), $("#sidebar-collapse-btn").on("click", function(e) {
//           e.preventDefault(), $("#app").toggleClass("sidebar-open")
//       }), $("#sidebar-overlay").on("click", function() {
//           $("#app").removeClass("sidebar-open")
//       }), $.browser.mobile) {
//       var e = $("#app ");
//       $("#sidebar-mobile-menu-handle ").swipe({
//           swipeLeft: function() {
//               e.hasClass("sidebar-open") && e.removeClass("sidebar-open")
//           },
//           swipeRight: function() {
//               e.hasClass("sidebar-open") || e.addClass("sidebar-open")
//           },
//           triggerOnTouchEnd: !1
//       })
//   }
// });