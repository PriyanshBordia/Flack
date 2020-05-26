document.addEventListener('DOMContentLoaded', () => {

    channels = []

    document.querySelector('.create_channel').disabled = true;

    document.querySelector('.new_msg').disabled = true;

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

    socket.on('connect', () => {

        // Functionality on click on any channel name
        document.querySelectorAll('#channels').forEach(channel => {
            channel.onclick = () => {
                const request = new XMLHttpRequest();
                request.open('GET', `/${channel}`);

                request.onload = () => {
                    const response = request.responseText;;
                    document.querySelector('#channel');

                };
            };
        });

// Channel Creation
        document.querySelector('#channel_name').onkeyup = () => {

            if (document.querySelector('#channel_name').value.length > 0)
            {
                var x = document.querySelector('#channel_name').value).trim();
                alert(`${x}`);
                
                if ((document.querySelector('#channel_name').value).trim() !== '')
                    document.querySelector('.create_channel').disabled = false;
            }

            else
                document.querySelector('.create_channel').disabled = true;
        };

        document.querySelector('#form_create_channel').onsubmit = () => {

            const New_Channel = document.querySelector('#channel_name').value;

            const li = document.createElement('li');
            li.innerHTML = New_Channel;

            document.querySelector('#channels-list').append(li);

            document.querySelector('.create_channel').disabled = true;

            document.querySelector('#channel_name').value = '';

            return false;
        };

// Messages
        document.querySelector('#message_text').onkeyup = () => {

            if (document.querySelector('#message_text').value.length > 0)
                document.querySelector('.new_msg').disabled = false;
            else
                document.querySelector('.new_msg').disabled = true;
        };

        document.querySelector('#form_new_msg').onsubmit = () => {

            const New_message = document.querySelector('#message_text').value;

            const li = document.createElement('li');
            li.innerHTML = New_message;

            document.querySelector('#messages-list').append(li);

            document.querySelector('.new_msg').disabled = true;

            document.querySelector('#message_text').value = '';

            return false;
        };

    });
});
