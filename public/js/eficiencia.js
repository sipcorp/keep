$(document).ready(function () {
  // flop
        $('.fliper').click(function(){
            var id = $(this).parentsUntil()[4].id
            $('.image-flip[id='+id+']').toggleClass('hover');
        });
    
        $("input[type=radio]").on("click",function(){
            var id = this.id
            if(id == "first_toggle"){
                $("section#virus").removeClass('out').removeClass('active')
                $("section#bacterias").removeClass('out').addClass('active');
                $("section#hongos").removeClass('out').removeClass('active')
            }
            if(id == "second_toggle"){
                $("section#bacterias").removeClass("active").addClass('out');
                $("section#hongos").removeClass('active').addClass('out');
                $("section#virus").removeClass("out").addClass('active');
            }
            if(id == "third_toggle"){
                $("section#bacterias").removeClass("active").addClass('out');
                $("section#virus").removeClass('active').addClass('out');
                $("section#hongos").removeClass("out").addClass('active');
            }
        })
        function HideTheElementAfterAnimation(id){
            $("section#"+id).css("display", "none");
        }
        mybutton = document.getElementById("myBtn");
        
        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function() {scrollFunction()};
        
        function scrollFunction() {
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
          } else {
            mybutton.style.display = "none";
          }
        }
        
    });
    