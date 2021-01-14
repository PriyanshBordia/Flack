import os
import time

from flask import Flask, render_template, json, jsonify, request
from flask_socketio import SocketIO, emit

from collections import defaultdict
from util import Create_Room

app = Flask(__name__)

app.config['SECRET_KEY'] = 'its-impossible-for-you-to-search-the-key-at-this-moment.'

socketio = SocketIO(app)

# Global Variables
Chat_Rooms = defaultdict(list)
Channels = []
User_Names = []

@app.route("/")
def index():
	return render_template("index.html")


@app.route("/create_user", methods=["POST", "GET"])
def create_user():
	global User_Names

	try:
		username = str(request.form.get("username"))

	except KeyError:
		return "Enter a valid name!"

	if username not in User_Names:
		return render_template("chat_window.html")


@app.route("/create_chatroom", methods = ["POST", "GET"])
def create_chatroom():
	global Channels
	if request.method == "GET":
		raise Exception ("get method")

	try:
		channel_name = str(request.form.get("channel_name"))

	except KeyError:
		return "Invalid Rooom Name!"

	if channel_name not in Channels:
		Channels.append(channel_name)
		Chat_Rooms[channel_name] = []

	else:
		raise Exception ("Already a channel!")


@app.route("/view_mesages/<string:room_name>", methods=["POST", "GET"])
def view_mesages():

	if room_name not in Channels :
		return "Invalid Room Name"

	else :
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

	emit("view_chat_room_msgs", {"selection": selection, 'messages': messages}, broadcast=True)


@socketio.on("send message")
def text_message(data):

	selection = data["Channel_name"]
	message = data["New_message"]

	Chat_Rooms[selection].append(message)

	emit("display message", {'selection': selection, 'message': message}, broadcast=True)

if __name__ == "__main__":
	socketio.run(app)
	# app.run(debug=True, host="0.0.0.0")
