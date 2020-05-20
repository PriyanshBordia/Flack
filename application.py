import os
import time

from flask import Flask, render_template, json, jsonify, request
from flask_socketio import SocketIO, emit

from util import Create_Room

app = Flask(__name__)
socketio = SocketIO(app)

# Global Variables
Chat_Rooms = []
User_Names = []
messages = {}

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
		return render_template("cubical.html", username=username)

	else:
		return render_template("index.html", message="Already a User in our records!")


@app.route("/create_room")
def create_room():
	try:
		room_name = str(request.form.get("room_name"))
	except KeyError:
		return "Enter a valid name for chat room!"

	if room_name in Chat_Rooms:
		return "Room name already taken!"

	else:
		Chat_Rooms.append(room_name)
		Create_Room(room_name)

	return render_template("cubical.html", channels=Chat_Rooms)


@socketio.on("send message")
def text_message(data):
	messages.append(data["message"])
	emit("display messages", messages, broadcast=True)


# various User details
@app.route("/avatar_view/<string:name>", methods=["GET", "POST"])
def avatar_view(name):
	return render_template("profile.html", name=name)


# @app.route("/", methods=["GET", "POST"])
# def ():
