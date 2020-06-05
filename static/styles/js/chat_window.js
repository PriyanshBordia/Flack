document.addEventListener('DOMContentLoaded', () => {

	var channels = [];

	if (!localStorage.getItem('channels'))
	{
		localStorage.setItem('channels', JSON.stringify(channels));
	}

	else
	{
		channels = JSON.parse(localStorage.getItem('channels'));

		for (let i = 0; i < channels.length; i++)
		{
			const li = document.createElement('li');
			li.innerHTML = channels[i];

			document.querySelector('#channels-list').append(li);
		}
	}

	var messages = {};

	if (!localStorage.getItem('messages'))
	{
		localStorage.setItem('messages', JSON.stringify(messages));
	}

	else
	{
		messages = JSON.parse(localStorage.getItem('messages'));

		// for (let i = 0; i < (messages["Channel_name"]).length; i++)
		// {
		// 	const li = document.createElement('li');
		// 	li.innerHTML = messages["Channel_name"][i];

		// 	document.querySelector('#messages-list').append(li);
		// }
	}


	document.querySelector('.create_channel').disabled = true;

	document.querySelector('.new_msg').disabled = true;

	
	var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

	socket.on('connect', () => {

	// Functionality on click on any channel name
		document.querySelectorAll('#channels').forEach(channel => {
			channel.onclick = () => {

				const selection = channel.dataset.name;
				// socket.emit('view_channel', {'selection' : selection});

				for (let i = messages[selection].length; i >= 0; i--)
				{
					const li = document.createElement('li');
					li.innerHTML = messages[selection][i];
			
					document.querySelector('#messages-list').append(li);
				}

			};
		});

	// Channel Creation
		document.querySelector('#channel_name').onkeyup = () => {

			if (document.querySelector('#channel_name').value.length > 0 && (document.querySelector('#channel_name').value).trim() !== '')
			{
					document.querySelector('.create_channel').disabled = false;
			}

			else
			{
				document.querySelector('.create_channel').disabled = true;
				return false;
			}

		};

		document.querySelector('#form_create_channel').onsubmit = () => {

			const New_Channel = (document.querySelector('#channel_name').value).trim();

			if (!channels.includes(New_Channel))
			{
				const li = document.createElement('li');
				li.innerHTML = New_Channel;
				li.style.color = 'orange'; 
				
				document.querySelector('#channels-list').append(li);

				const button = document.createElement('button');
				button.innerHTML = 'Click';
				button.setAttribute('data-name', New_Channel);
				
				document.querySelector('#channels-list').append(button);

				channels.push(New_Channel);
				localStorage.setItem('channels', JSON.stringify(channels));

				messages[New_Channel] = [];
				localStorage.setItem('messages', JSON.stringify(messages));
			}

			else
				alert(`${New_Channel} already exists`)

			document.querySelector('.create_channel').disabled = true;

			document.querySelector('#channel_name').value = '';

			return false;
		};

	// Messages
		document.querySelector('#message_text').onkeyup = () => {

			if (document.querySelector('#message_text').value.length > 0 && (document.querySelector('#message_text').value).trim() !== '')
			{
					document.querySelector('.new_msg').disabled = false;
			}

			else
			{
				document.querySelector('.new_msg').disabled = true;
				return false;
			}
		};

		document.querySelector('#form_new_msg').onsubmit = () => {

			const Channel_name = document.querySelector('.channels-list').dataset.name;

			const New_message = (document.querySelector('#message_text').value).trim();

			const li = document.createElement('li');
			li.innerHTML = New_message;

			document.querySelector('#messages-list').append(li);

			document.querySelector('.new_msg').disabled = true;

			document.querySelector('#message_text').value = '';

			if (!Array.isArray(messages[Channel_name]))
			{
				messages[Channel_name] = [];
			}

			else
			{
				messages[Channel_name].push(New_message);
			}

			localStorage.setItem('messages', JSON.stringify(messages));

			return false;
		};

	});

	// socket.on('view_chat_room_msgs', data => {
	// 	document.querySelector('#messages-list').innerHTML += data.messages;

	// });
});
