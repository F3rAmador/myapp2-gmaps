$(function () {
	
	$('#btn-mostrar1').on('click', function () {

		$('#caja-mensaje').show();
		$('#btn-mostrar4')
			.removeClass('btn-primary')
			.removeClass('btn-danger')
			.addClass('btn-success')

	});

	$('#btn-mostrar2').on('click', function () {

		$('#caja-mensaje').fadeIn(3000);
		$('#btn-mostrar4')
			.removeClass('btn-primary')
			.removeClass('btn-success')
			.addClass('btn-danger')

	});

	$('#btn-mostrar3').on('click', function () {

		$('#caja-mensaje').slideDown(3000);
		$('#btn-mostrar4')
			.removeClass('btn-danger')
			.removeClass('btn-success')
			.addClass('btn-primary')

	});

	$("#btn-saludar").on("click", function (){
		
		var $me = $(this);
		var color = $me.data("color")

		$("#caja-color")
			.removeAttr("class")
			.attr("class","alert alert-" + color)

	});

});