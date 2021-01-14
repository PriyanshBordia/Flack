import os
import time
import environ

from flask import Flask, render_template, request, url_for, flash
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash

from collections import defaultdict
from util import Create_Room

from models import *

env = environ.Env()
environ.Env.read_env()

app = Flask(__name__)
socketio = SocketIO(app)

app.config['SQLALCHEMY_DATABASE_URI'] = env("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = env("SECRET_KEY")

db.init_app(app)

# Global Variables
Chat_Rooms = defaultdict(list)
Channels = []
User_Names = []

@app.route("/")
def index():
	return render_template("login.html")
	# if current_user.is_authenticated:
	# 	return render_template("home.html")
	
	# form = LoginForm()
	# else
	# 	return render_template("login.html")


@app.route("/login", methods=["POST", "GET"])
def login():

	users = User.query.all()

	try:
		email = str(request.form.get("email"))
	except KeyError:
		return render_template("error.html", message="Enter a valid email!")

	try:
		password = str(request.form.get("password"))
	except KeyError:
		return render_template("error.html", message="Enter a valid password!")

	if email and password:
		username = email.split('@')[0]
		if (check_password_hash(generate_password_hash(password), password)) and (username in users):
			if username in users:
				return render_template("home.html")
			else:
				return render_template("error.html", message="Invalid Username.!! Try register.")
	else:
		return render_template("error.html", message="Ill formated.!!")


@app.route("/register", methods=["POST", "GET"])
def register():

	try:
		username = str(request.form.get("username"))
	except KeyError:
		return "Enter a valid name!"

	try:
		password = str(request.form.get("password"))
	except KeyError:
		return "Enter a valid name!"

	if username and password:

		users = User.query.all()

		if username not in users:
			password = generate_password_hash(password)
			user = User(username=username, password=password)
			db.execute()
			return render_template("login.html")
		else:
			return render_template("error.html", message="User already exists.!! Try LogIn.")
	else:
		return render_template("error.html", message="Ill formated.!!")
	


if __name__ == "__main__":
	socketio.run(app)
