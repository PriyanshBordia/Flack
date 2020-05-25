import os
import time

from flask import Flask, render_template, json, jsonify, request
from flask_socketio import SocketIO, emit

from collections import defaultdict
from util import Create_Room

app = Flask(__name__)
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
	try:
		username = str(request.form.get("username"))
	except KeyError:
		return "Enter a valid name!"

	if username not in User_Names:
		User_Names.append(username)
		return render_template("chat_window.html", username=username, channels=Channels)

	else:
		return render_template("error.html", message="Already a User in our records!")






# @app.route("/create_room")
# def create_room():
# 	try:
# 		room_name = str(request.form.get("room_name"))
# 	except KeyError:
# 		return "Enter a valid name for chat room!"
#
# 	if room_name in Chat_Rooms:
# 		return "Room name already taken!"
#
# 	else:
# 		Channels.append(room_name)
#
# 	return render_template("chat_window.html", channels=Channels)
#
#
# @socketio.on("send message")
# def text_message(data):
# 	messages.append(data["message"])
# 	emit("display messages", messages, broadcast=True)
#
#
# # various User details
# @app.route("/avatar_view/<string:name>", methods=["GET", "POST"])
# def avatar_view(name):
# 	return render_template("profile.html", name=name)
#
#
# @app.route("/", methods=["GET", "POST"])
# def ():
