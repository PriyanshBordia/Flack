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

	return render_template("chat_window.html", username=username, channels=Channels)
