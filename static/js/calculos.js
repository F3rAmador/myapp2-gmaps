//alert('Salud');
//prompt('Ingrese un dato');
//confirm('estas seguro?');


document.addEventListener('DOMContentLoaded', function(e) {
	//Aqui va todo el codigo de programacion del sitio o aplicacion


	var acumSubTotal = 0;
	var acumImp = 0;
	var acumTotal = 0;

	var boton = document.querySelector('#btn-calcular');

	boton.addEventListener('click', function() {
		//Guardar valores del form en variables
		var nombre = document.querySelector('#txt-nombre');
		var c = document.querySelector('#txt-cantidad');
		var p = document.querySelector('#txt-precio');
		var imp = 0;
		var graba = "No"

		//Realizar las validaciones de los textBoxes

		// c = (m * r) / (1 - Math.pow(1 + r, -n))

		var cantidad = parseInt(c.value);
		var precio = parseFloat(p.value);

		var isChecked = document.getElementById("chk-grabable").checked;

		if(isChecked){
			var imp = 0.15;
			var graba = "Si";
		}

		var subTotal1 = cantidad*precio;
		var subTotal2 = subTotal1 * imp;
		var total =  subTotal1 + subTotal2;

		var body = document.querySelector('#tdata');

		var fila = body.insertRow();

		fila.insertCell().innerHTML = nombre.value;
		fila.insertCell().innerHTML = precio.toLocaleString();
		fila.insertCell().innerHTML = cantidad.toLocaleString();
		fila.insertCell().innerHTML = graba;
		fila.insertCell().innerHTML = subTotal1.toFixed(2).toLocaleString();

		acumImp += subTotal2;
		acumSubTotal += subTotal1
		acumTotal += acumImp + acumSubTotal

		document.querySelector('#lbl-subTotal').innerText = acumSubTotal.toFixed(2).toLocaleString();
		document.querySelector('#lbl-imp').innerText = acumImp.toFixed(2).toLocaleString();
		document.querySelector('#lbl-total').innerText = acumTotal.toFixed(2).toLocaleString();
	})



})