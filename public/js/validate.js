$(document).ready(function () {
$('.price-list').popover();
	
	// flop
	$('.fliper').click(function(){
		var id = $(this).parentsUntil()[4].id
		$('.image-flip[id='+id+']').toggleClass('hover');
	});
});
