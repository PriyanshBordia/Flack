document.addEventListener('DOMContentLoaded', () => {

	var channels = [];

	if (!localStorage.getItem('channels'))
	{
		localStorage.setItem('channels', JSON.stringify(channels));
	}

	else
	{
		var channels = JSON.parse(localStorage.getItem('channels'));

		for (let i = 0; i < channels.length; i++)
		{
			const button = document.createElement('button');
			button.innerHTML = channels[i];

			button.setAttribute('class', 'channel-button btn btn-outline-success mr-2 mt-2 pt-2');
			button.setAttribute('data-name', channels[i]);

			document.querySelector('#channels-list').append(button);
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

		document.querySelector('#messages-list').innerHTML = '';

		if (localStorage.getItem('current_channel') !== 'null')
		{
			Channel_name = localStorage.getItem('current_channel');

			document.querySelector('#chat-room-name').innerHTML = Channel_name;

			for (let i = (messages[Channel_name]).length - 1; i >= 0; i++)
			{
				const li = document.createElement('li');
				li.innerHTML = messages[Channel_name][i];
				li.setAttribute('class', 'alert alert-info');

				document.querySelector('#messages-list').append(li);
			}
		}
	}


	if (!localStorage.getItem('current_channel'))
	{
		localStorage.setItem('current_channel', null);
	}

	document.querySelector('.create_channel').disabled = true;

	document.querySelector('.new_msg').disabled = true;


	var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

	socket.on('connect', () => {

	// Functionality on click on any channel name
		document.querySelectorAll('.channel-button').forEach(function(button) {

			button.onclick = function () {

				document.querySelector('#messages-list').innerHTML = '';

				const selection = button.dataset.name;

				localStorage.setItem('current_channel', selection);

				document.querySelector('#chat-room-name').innerHTML = selection;

				for (let i = messages[selection].length - 1; i >= 0; i--)
				{
					const li = document.createElement('li');
					li.innerHTML = messages[selection][i];

					li.setAttribute('class', 'alert alert-info');

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
				const button = document.createElement('button');
				button.innerHTML = New_Channel;

				button.setAttribute('class', 'channel-button btn btn-outline-success mr-2 mt-2 pt-2');
				button.setAttribute('data-name', New_Channel);

				document.querySelector('#channels-list').append(button);

				channels.push(New_Channel);
				localStorage.setItem('channels', JSON.stringify(channels));

				messages[New_Channel] = [];
				localStorage.setItem('messages', JSON.stringify(messages));

				localStorage.setItem('current_channel', New_Channel);

				document.querySelector('#messages-list').innerHTML = '';
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

			const Channel_name = localStorage.getItem('current_channel');

			const New_message = (document.querySelector('#message_text').value).trim();

			socket.emit('send message', {'Channel_name': Channel_name, 'New_message': New_message});

		};

	});


	socket.on('display message', data => {

		const Channel_name = data.selection;

		const New_message = data.message;

		const li = document.createElement('li');
		li.innerHTML = New_message;

		li.setAttribute('class', 'alert alert-info');

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

	});

	// socket.on('view_chat_room_msgs', data => {

	// 	const selection = data.selection;

	// 	const messages = data.messages;

	// 	for (let i = messages[selection].length - 1; i >= 0; i--)
	// 	{
	// 		const li = document.createElement('li');
	// 		li.innerHTML = messages[selection][i];
	// 		li.setAttribute('class', 'alert alert-info');

	// 		document.querySelector('#messages-list').append(li);
	// 	}
	// });

	function Today_Date()
	{
		var currentDate = new Date();

		var date = currentDate.getDate();
		var month = currentDate.getMonth() + 1; //Be careful! January is 0 not 1
		var year = currentDate.getFullYear();

		return (date + '/' + month + '/' + year);
	};

	function Msg_Time()
	{
		var currentDate = new Date();

		var time = ((currentDate.getTime() / 1000 ) % 24);
	};
});
