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
	global User_Names

	try:
		username = str(request.form.get("username"))

	except KeyError:
		return "Enter a valid name!"

	return render_template("chat_window.html", username=username, channels=Channels)


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

	else:
		raise Exception ("Already a channel!")

@socketio.on("create channel")
def create_channel(data):
	global Channels

	if channel_name not in Channels:
		Channels.append(channel_name)

	emit("view channel", {"selection": channel_name})

@socketio.on("view channel")
def view_channel(data):
	selection = data["selection"]
	emit("view_chat_room_msgs", {"selection": selection}, broadcast=True)


@socketio.on("send message")
def text_message(data):
	messages.append(data["message"])
	emit("display messages", messages, broadcast=True)
