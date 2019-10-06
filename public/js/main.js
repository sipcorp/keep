$(document).ready(function () {
    $(document).on("click",function(){
     var draggable = $(this)  
      //this will prevent any collision
    $($this).droppable({
         drop: function( event, ui ) {
         ui.draggable.draggable( 'option', 'revert', true );                     
         }
       });    
    })
     
    $(".droppable").droppable({
        accept: ".draggable", 
        drop: function (event, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            $(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn);
        }
    });
});
