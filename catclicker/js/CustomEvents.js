$(function(){

	$.ajax({
		url: "/js/cats.json",
		success:function(result){

			cats.cats = result;

			for(let i = 0; i < result.length; i++) {
				cats.contructSidebar(result[i]);
			}

			$('.sidebar').css('width', `calc(180px*${result.length}`);

			$('.sidebar .cat').click(function(){
				let catPosition = cats.findCat($(this).find('img').attr('alt'));
				$('.main .cat').empty();
				$('.main .cat').append(`<img class="catPhoto" src="${cats.cats[catPosition].image_big}" alt="${cats.cats[catPosition].name}"><span class="catname">${cats.cats[catPosition].name}</span>`);
			});

		}
	});

	/*xuxa.click = 0;

	$('.catPhoto a').click(function() {
		let valor = parseInt($(this).parent().find('.resultado').find('.valor').text());

		valor++;

		$(this).parent().find('.resultado').find('.valor').empty();
		$(this).parent().find('.resultado').find('.valor').append(valor);
		$(this).parent().find('.resultado').show();
	})*/
});

var cats = {
	'contructSidebar': function(cat) {
		$('.sidebar').find('ul').append(`<li><div class="cat"><img class="catPhoto" src="${cat.image_min}" alt="${cat.name}"><span class="catname">${cat.name}</span></div></li>`);
	},
	'openCat': function(cat){
		$('.main .cat').empty();
		$('.main .cat').append(`<img src="${cat.image_big}" alt="${cat.name}"><span class="catname">${cat.name}</span>`)
	},
	'findCat': function(catName){
		for (let i = 0; i < this.cats.length; i++) {
			if(this.cats[i].name == catName) {
				return i;
			}
		}
	}
}