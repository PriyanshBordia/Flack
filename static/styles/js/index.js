document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

        socket.on('connect', () => {
            document.querySelector('#msg-submit-button').onclick = () => {

            };
        });

        socket.on('display messages', data => {

            document.querySelector('#').innerHTML = data.channel;

        });
});
