$(document).ready(function () {

	var banner = {
		padre: $('#banner'),
		numeroSlides: $('#banner').children('.slide').length,
		posicion: 1
	};

	var info = {
		padre: $('#info'),
		numeroSlides: $('#info').children('.slide').length,
		posicion: 1
	}

	// El primer slide aparecera desplazado
	banner.padre.children('.slide').first().css({
		'left': 0
	});

	info.padre.children('.slide').first().css({
		'left': 0
	});

	// calcula el alto que tendran los contenedores padre
	var altoBanner = function () {
		var alto = banner.padre.children('.slide').outerHeight();
		banner.padre.css({
			'height': alto + 'px'
		});
	}

	var altoInfo = function () {
		var alto = info.padre.children('.active').outerHeight();
		info.padre.animate({
			'height': alto + 'px'
		});
	}

	// #contenedor tendra el 100% del alto de la pagina. 
	// luego centrarlo verticalente con flexbox.
	var altoContenedor = function () {
		var altoVentana = $(window).height();

		if (altoVentana <= $('.contenedor').outerHeight() + 200) {
			$('#contenedor').css({ 'height': '' });
		} else {
			$('#contenedor').css({ 'height': altoVentana + 'px' });
		}
	}

	altoBanner();
	altoContenedor();
	altoInfo();

	// Si cambiamos el tamaño de la pantalla se
	// ejecuta esta funcion para determinar el nuevo tamaño del elemento
	$(window).resize(function () {
		altoBanner();
		altoContenedor();
	});

	$('#info').children('.slide').each(function () {
		$('#botones').append('<span>');
	});

	// El primer elemento inicia con su clase active
	$('#botones').children('span').first().addClass('active');

	/* Banner*/


	$('#banner-next').on('click', function (e) {
		e.preventDefault();

		if (banner.posicion < banner.numeroSlides) {
			// las slides empiezan desde la derecha.
			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			// se elimina la clase active y se la ponemos al siguiente elemento
			$('#banner .active').removeClass('active').next().addClass('active').animate({
				'left': 0
			});

			// se anima el slide anterior para que se deslaza hacia la izquierda
			$('#banner .active').prev().animate({
				'left': '-100%'
			});

			banner.posicion = banner.posicion + 1;
		} else {
			// el slide activo, se anime hacia la derecha
			$('#banner .active').animate({
				'left': '-100%'
			});

			// Seleccion de todos los slides que no tengan la clase .active
			// y se posicionan a la derecha
			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			// se elmina la clase active y se coloca al primer elemento.
			$('#banner .active').removeClass('active');
			banner.padre.children().first().addClass('active').animate({
				'left': 0
			});

			banner.posicion = 1;
		}
	});

	/* Boton Anterior*/
	$('#banner-prev').on('click', function (e) {
		e.preventDefault();

		if (banner.posicion > 1) {
			// verificamos que todos los elementos hijos (que no sean) .active se posicionen a la izquierda
			banner.padre.children().not('.active').css({
				'left': '-100%'
			});

			// Desplazamos el slide activo de izquierda a derecha
			$('#banner .active').animate({
				'left': '100%'
			});

			// Eliminamos la clase active y se la ponemos al slide anterior
			$('#banner .active').removeClass('active').prev().addClass('active').animate({
				'left': 0
			});

			banner.posicion = banner.posicion - 1;
		} else {

			// verificamos de que los slides empiecen a la izquierda
			banner.padre.children().not('.active').css({
				'left': '-100%'
			});

			// Animamos el slide activo hacia la derecha
			$('#banner .active').animate({
				'left': '100%'
			});

			// se elimina la clase active y se la ponemos al primer elemento.
			$('#banner .active').removeClass('active');
			banner.padre.children().last().addClass('active').animate({
				'left': 0
			});

			banner.posicion = banner.numeroSlides;
		}

	});


	/* Slider Info*/

	// Boton Siguiente
	$('#info-next').on('click', function (e) {
		e.preventDefault();

		if (info.posicion < info.numeroSlides) {
			// verificamos que las demas slides empiecen desde la derecha.
			info.padre.children().not('.active').css({
				'left': '100%'
			});

			// se elimina la clase active y se la ponemos al siguiente elemento.Y lo animamos
			$('#info .active').removeClass('active').next().addClass('active').animate({
				'left': 0
			});

			// se anima el slide anterior para que se deslaza hacia la izquierda
			$('#info .active').prev().animate({
				'left': '-100%'
			});

			// se elimina la clase active y se la ponemos al siguiente elemento
			$('.botones').children('.active').removeClass('active').next().addClass('active');

			info.posicion = info.posicion + 1;
		} else {
			// el slide activo, se anima hacia la derecha
			$('#info .active').animate({
				'left': '-100%'
			});

			// los slides que no tengan la clase .active los posicionamos a la derecha
			info.padre.children().not('.active').css({
				'left': '100%'
			});

			// se elimina la clase active y se coloca al primer elemento
			$('#info .active').removeClass('active');
			info.padre.children().first().addClass('active').animate({
				'left': 0
			});

			// se elimina la clase active y se coloca al primer elemento
			$('.botones').children('.active').removeClass('active');
			$('.botones').children('span').first().addClass('active');

			info.posicion = 1;
		}

		altoInfo();
	});

	// Boton Anterior
	$('#info-prev').on('click', function (e) {
		e.preventDefault();

		if (info.posicion > 1) {

			// se verifica todos los elementos hijos se posicionen a la izquierda, menos los .active
			info.padre.children().not('.active').css({
				'left': '-100%'
			});

			// Deslpazo  del slide activo de izquierda a derecha
			$('#info .active').animate({
				'left': '100%'
			});

			// Se elimina la clase active y se coloca al slide anterior.
			$('#info .active').removeClass('active').prev().addClass('active').animate({
				'left': 0
			});

			$('#botones').children('.active').removeClass('active').prev().addClass('active');

			info.posicion = info.posicion - 1;
		} else {

			// Asegurar que los slides empiecen a la izquierda
			info.padre.children().not('.active').css({
				'left': '-100%'
			});

			// Animar el slide activo hacia la derecha
			$('#info .active').animate({
				'left': '100%'
			});

			// Eliminar la clase active y se coloca al primer elemento.
			$('#info .active').removeClass('active');
			info.padre.children().last().addClass('active').animate({
				'left': 0
			});

			$('#botones').children('.active').removeClass('active');
			$('#botones').children('span').last().addClass('active');

			info.posicion = info.numeroSlides;
		}

		altoInfo();
	});
});