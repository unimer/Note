#!/usr/bin/python3


from flask import Flask, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import sys

app=Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
auth = HTTPBasicAuth(app)
cors = CORS(app, resources={r"*": {"origins": "*"}})

messages = {}

def validationJsonErrorResponse():
    return json.jsonify(errorMessages=messages)


from app.models import main
from app.controller import UserController, NoteController
from app.controller import auth