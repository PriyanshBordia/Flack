from enum import Enum
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(101), nullable=False)
    password = db.Column(db.String(101), nullable=False)
    first = db.Column(db.String(101))
    last = db.Column(db.String(101))
    age = db.Column(db.Integer)
    # gender = db.Column(db.Enum, Enum('Female', 'Male', 'Other'))
    email = db.Column(db.String)

    active = db.Column(db.DateTime, nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __str__(self):
        return f"{self.first} {self.last} {self.age} {self.gender}"


class Space(db.Model):
    
    __tablename__ = 'spaces'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)



class Message(db.Model):

    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    space = db.Column(db.Integer, db.ForeignKey("spaces.id"), nullable=False)
