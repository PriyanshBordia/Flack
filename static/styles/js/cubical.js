document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.create_channel').disabled = true;

    document.querySelector('').disabled = true;

    var socket = io.connect(location. + '//' + document.domain + ':' + location.port)

    socket.on('connect', () => {

        // Functionality on click on any channel name
        document.querySelectorAll('#channels').forEach(channel => {
            channel.onclick = () => {

                const channel_name = document.querySelector('#channel').name;
            };
        });

        if (document.querySelector('#channel_name').value.length > 0)
            document.querySelector('.create_channel').disabled = false;
        else
            document.querySelector('.create_channel').disabled = true;

        document.querySelector('#form_create_channel').onsubmit = () => {

        };

        document.querySelector('#form_send_new_msg').onsubmit = () => {

            const New_Channel = document.querySelector('#ne_msg').value;

            const li = document.createElement('li');
            li.innerHTML = New_Channel;

            document.querySelector('#channels').append(li);

            return false; 

        };
    });
});
