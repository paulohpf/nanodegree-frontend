$('input[type="submit"]').click(function(event) {
	event.preventDefault(); // Aqui eu bloqueio o evento de redirecionar para outra pagina
	makeGrid();
});

function makeGrid() {

	$('#pixelCanvas').children().remove(); // Faço a limpeza da tabela

	let altura = $('input[name="height"]').val(); // Valor de altura
	let largura = $('input[name="width"]').val(); // Valor de largura

	// Crio o número de linhas vertical
	for(count = 0; count < altura; count++ ) {
		$('#pixelCanvas').append('<tr></tr>');
	}

	// Crio o número de linhas horizontal
	for(count = 0; count < largura; count++) {
		$('tr').append('<td></td>');
	}

	// Adiciono a cor no pixel selecionado
	$('#pixelCanvas').find('td').click(function() {
		let cor = $('#colorPicker').val();
		$(this).css('background', cor);
	});
}
