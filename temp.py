@app.route("/create_chatroom", methods=["POST", "GET"])
def create_chatroom():

	global Channels

	Channels = Spaces.query.all()

	if request.method == "GET":
		raise Exception("get method")

	try:
		channel_name = str(request.form.get("channel_name"))

	except KeyError:
		return "Invalid Rooom Name!"

	if channel_name not in Channels:
		Channels.append(channel_name)
		Chat_Rooms[channel_name] = []

	else:
		raise Exception("Already a channel!")


@app.route("/view_mesages/<string:room_name>", methods=["POST", "GET"])
def view_mesages():

	if room_name not in Channels:
		return "Invalid Room Name"

	else:
		return jsonify(Chat_Rooms[room_name])


@socketio.on("create channel")
def create_channel(data):
	channel_name = data["channel_name"]

	global Channels

	if channel_name not in Channels:
		Channels.append(channel_name)

	emit("channel created", {"selection": channel_name}, broadcast=True)
	# return True;


@socketio.on("view channel")
def view_channel(data):
	selection = data["selection"]
	messages = Chat_Rooms[selection]

	emit("view_chat_room_msgs", {
	     "selection": selection, 'messages': messages}, broadcast=True)


@socketio.on("send message")
def text_message(data):

	selection = data["Channel_name"]
	message = data["New_message"]

	Chat_Rooms[selection].append(message)

	emit("display message", {'selection': selection,
                          'message': message}, broadcast=True)

if username not in User_Names:
	User_Names.append(username)

else:
	return render_template("error.html", message="Already a User in our records!")

@app.route("/create_room")
def create_room():
	try:
		room_name = str(request.form.get("room_name"))
	except KeyError:
		return "Enter a valid name for chat room!"

	if room_name in Chat_Rooms:
		return "Room name already taken!"

	else:
		Channels.append(room_name)

	return render_template("chat_window.html", channels=Channels)





# various User details
@app.route("/avatar_view/<string: name>", methods=["GET", "POST"])
def avatar_view(name):
	return render_template("profile.html", name=name)


@app.route("/", methods=["GET", "POST"])
def ():
