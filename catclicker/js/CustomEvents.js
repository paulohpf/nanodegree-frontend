var xuxa = [];

$(function(){
	xuxa.click = 0;

	$('.catPhoto a').click(function() {
		let valor = parseInt($(this).parent().find('.resultado').find('.valor').text());
		
		valor++;

		$(this).parent().find('.resultado').find('.valor').empty();
		$(this).parent().find('.resultado').find('.valor').append(valor);
		$(this).parent().find('.resultado').show();
	})
});