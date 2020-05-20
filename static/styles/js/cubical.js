document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.create_channel').disabled = true;

    document.querySelector('.send_new_msg').disabled = true;

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

    socket.on('connect', () => {

        // Functionality on click on any channel name
        // document.querySelectorAll('#channels').forEach(channel => {
        //     channel.onclick = () => {
        //         const channel_name = document.querySelector('#channel').name;
        //
        //     };
        // });

// Channel Creation
        document.querySelector('#channel_name').onkeyup = () => {

            if (document.querySelector('#channel_name').value.length > 0)
                document.querySelector('.create_channel').disabled = false;
            else
                document.querySelector('.create_channel').disabled = true;
        };

        document.querySelector('#form_create_channel').onsubmit = () => {

            const New_Channel = document.querySelector('#channel_name').value;

            const li = document.createElement('li');
            li.innerHTML = New_Channel;

            document.querySelector('#channels').append(li);

            document.querySelector('.create_channel').disabled = true;

            document.querySelector('#channel_name').value = '';

            return false;
        };


// Messages
        document.querySelector('#new_msg').onkeyup = () => {

            if (document.querySelector('#new_msg').value.length > 0)
                document.querySelector('.send_new_msg').disabled = false;
            else
                document.querySelector('.send_new_msg').disabled = true;
        };

        document.querySelector('#form_send_new_msg').onsubmit = () => {

            const New_message = document.querySelector('#new_msg').value;

            const li = document.createElement('li');
            li.innerHTML = New_message;

            document.querySelector('#messages').append(li);

            document.querySelector('.send_new_msg').disabled = true;

            document.querySelector('#new_msg').value = '';

            return false;

        };
    });
});
