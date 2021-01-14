import environ
import os

from flask import Flask, render_template, request, url_for, flash

from models import *

app = Flask(__name__)

env = environ.Env()
environ.Env.read_env()

app.config['SQLALCHEMY_DATABASE_URI'] = env("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = env("SECRET_KEY")

db.init_app(app)

def main():
    db.create_all()

if __name__ == '__main__':
    with app.app_context():
       main()
