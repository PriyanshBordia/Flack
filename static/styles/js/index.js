document.addEventListener('DOMContentLoaded', () => {

	users = []

	if (!localStorage.getItem('users'))
	{
		localStorage.setItem('users', JSON.stringify(users));
	}

	else
	{
		users = JSON.parse(localStorage.getItem('users'));
	}

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

        socket.on('connect', () => {

        	document.querySelector('#create_new_user').onsubmit = () => {

				const Username = (document.querySelector('#username').value).trim();

				if (Username !== '')
				{
					if (!users.includes(Username))
					{
						users.append(Username);
					}

					else {
						alert(`${Username} already exists!`);
					}
				}

				document.querySelector('#username').value = '';

				return false;
			};
        });

     	// socket.on('display messages', data => {
//
//             document.querySelector('#').innerHTML = data.channel;
//
//             return false;
//         });
});
