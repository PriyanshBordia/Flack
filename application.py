import os
import time

from flask import Flask, render_template, json, jsonify, request
from flask_socketio import SocketIO, emit

from util import Create_Room

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# Global Variables
Chat_Rooms = []
User_Names = []

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/create_user", methods=["POST", "GET"])
def create_user():
    try:
        username = str(request.form.get("username"))
    except KeyError:
        return "Enter a name"

    if user_name not in User_Names:
        User_Names.append(username)
        return render_template("cubical.html", username=username)

    else:
        return "Already a User in our records!"


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

# various User details
@app.route("/avatar_view/<str:name>", methods=["GET", "POST"])
def avatar_view(name):
    return render_template("profile.html")


@app.route("/logout_view", methods=["GET", "POST"])
def logout_view():
    logout(request)
