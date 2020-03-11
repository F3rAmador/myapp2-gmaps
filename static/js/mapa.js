var _lat = 37.751436;
var _lon = -122.4460134;

var _map = null;
var _marker = null;
var _geocode = null;
var _dirService = null;
var _dirDisplay = null;
var _panorama = null;

var contador = 1;

$(function () {

	$("#cbo-tipoMapa").on("change", function(){
		var tipo = $(this).val();

		_map.setMapTypeId(tipo);
	})

	$("#btn-ruta").on("click", function (){
		var desde = $("#txt-desde").val();
		var hasta = $("#txt-hasta").val();

		var peticion = {
			origin: desde,
			destination: hasta,
			travelMode: "DRIVING", // a pie= "WALKING", a bicicleta= "BICYCLING", TRANSIC
			unitSystem: google.maps.UnitSystem.METRIC,
			provideRouteAlternatives: true

		}

		_dirService.route(peticion, function(result,status){
			if (status === "OK")
			{
				_dirDisplay.setMap(_map);
				_dirDisplay.setDirections(result);
				_dirDisplay.setPanel($("#info-rutas")[0]);
			}
		})
	})

	$("#txt-buscar").on("keyup", function(e) {
		var tecla = e.which || e.keyCode;

		if(tecla === 13)
		{
			// investigar sobre el objeto InfoWindow
			//colcocar un InfoWindow a cada marker de las busquedas
			var busqueda = $(this).val().trim();

			if(busqueda)
			{
				_geocode.geocode({'address':busqueda}, function(result, status){
					console.log(status);
					if(status == 'OK')
					{
						if(result[0])
						{
							var infowindow = new google.maps.InfoWindow({
								content: result[0].formatted_address
							  });
							
							_map.setCenter(result[0].geometry.location)
							_panorama.setPosition(result[0].geometry.location)
							// agregar el marcador  al resultado
							var markerConfig = {
		
								map: _map,
								position: result[0].geometry.location,
								zIndex : 100,
								draggable: false,
								icon: "/myapp2/static/img/marker.png"
						
							}
						
							_marker = new google.maps.Marker(markerConfig);
						
							_marker.addListener('click', function(){
								
								infowindow.open(_map, _marker)
								
							})
							console.log(result[0].formatted_address)
							
						} 
					} 
					
				})
			}
		}
	})

	$("#btn-crear").on("click", function() {

		var lat = parseFloat($("#Latitud").text());
		var lon = parseFloat($("#Longitud").text());

		var mCoords = {lat: lat, lng: lon};
		var direccion = '';
		// coords -> direccion: location
		// direccion -> coords: address
		_geocode.geocode({'location':mCoords}, function(result, status){
			console.log(status);
			if(status == 'OK')
			{
				if(result[0])
				{
					direccion = result[0].formatted_address;
				} else {
					direccion= 'No se encontro una direccion';
				}
			} else {
				direccion= 'No hay respuesta de google';
			}
			var marker = new google.maps.Marker({
				map: _map,
				position: mCoords,
				title: direccion,
				zIndex : -1 
			});
		});

	})

})


function init()
{
	console.log(google.maps)

	var gCoords = {lat:_lat, lng:_lon};
	var mapConfig = {

		mapTypeId: "roadmap",
		zoom: 13,
		center: gCoords


	}

	_map = new google.maps.Map($('#mapa')[0], mapConfig)

	var markerConfig = {
		
		map: _map,
		position: gCoords,
		title: "San Francisco",
		zIndex : 100,
		draggable: true

	}

	_marker = new google.maps.Marker(markerConfig);

	_marker.addListener('position_changed', function(){
		var coords = _marker.getPosition();

		$("#Latitud").text(coords.lat());
		$("#Longitud").text(coords.lng());
	}) //Programamos eventos en google maps

	//crear las instancias de las clases de google maps
	_geocode = new google.maps.Geocoder();
	_dirService = new google.maps.DirectionsService();
	_dirDisplay = new google.maps.DirectionsRenderer();

	var panoramaConf = {
		pisition: gCoords,
		pov: {heading: 0, pitch: 0}
	}

	_panorama = new google.maps.StreetViewPanorama($("#pano")[0], panoramaConf);
	_map.setStreetView(_panorama);

	// uso de drawingManager y calculo de distancias
	var dm = new google.maps.drawing.DrawingManager({
		drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER,
			drawingModes: ["polyline", "circle"]
		},
		polylineOptions: {editable: true}
	})

	dm.setMap(_map);
	dm.addListener("overlaycomplete", function(e) {
		var ruta = e.overlay.getPath();

		var coords = ruta.getArray();

		console.log(coords[0]);
		console.log(coords[coords.length - 1]);


		var distancia = google.maps.geometry.spherical.computeLength(ruta.getArray());

		if(distancia > 1000)
		{
			var kms = distancia / 1000;
			$("#distancia").text(`${kms.toFixed(2)} Kms`);
		} else {
			$("#distancia").text(`${distancia.toFixed(2)} Mts`);
		}
	})

	// agregar capas de trafico, transito y ciclismo
	var capaTrafico = new google.maps.TrafficLayer();
	capaTrafico.setMap(_map);

	var capaTransito = new google.maps.TransitLayer();
	capaTransito.setMap(_map);

	var capaBisi = new google.maps.BicyclingLayer();
	capaBisi.setMap(_map);

}

function localizarme ()
{

	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		alert("Tu navegador esta obsoleto");
	}

}

function success (pos)
{

	var lat = pos.coords.latitude;
	var lon = pos.coords.longitude;
	

}

function error (e)
{

	console.log(e)

}