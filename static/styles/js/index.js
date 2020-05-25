document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

        socket.on('connect', () => {

            return false;
        });

        socket.on('display messages', data => {

            document.querySelector('#').innerHTML = data.channel;

            return false;
        });
});
