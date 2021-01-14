document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)
	var socket = io.connect("http://27.0.0.1:")
	
	socket.on('connect', () => {

	});
});
