from app import app
from app.models.main import *
from flask import json, request
from flask_login import login_required
from app.forms.UserForm import UserForm
from app import messages
import sys

# READ
@app.route('/user', methods=['GET'])
# TODO: login_required
def user():
    if (request.args.get('id') != None):
        user = User.query.filter(User.id == request.args["id"])
        if user == None:
            return json.jsonify(user.forAll())
        else:
            return json.jsonify(success=False, message="Not Found")
    else: 
        users = User.query.all()
        if users == None:
            return json.jsonify([user.forAll()] for user in users)
        else:
            return json.jsonify(success=False, message="Not Found")


#CREATE
@app.route("/user/add", methods=['GET', 'POST'])
def add():
    if request.method == 'GET':
        user=User()
        return json.jsonify(user.forAll())
    elif request.method == 'POST':
        form = UserForm(request.args)
        if not form.validateNew():
            return json.jsonify(errorMessages=messages)
        
        user = User()
        user.username = form.username
        user.email = form.email
        user.set_password(form.password)
        user.organization = form.organization
        user.deleted = form.deleted
        
        db.session.add(user)
        db.session.commit()
        return json.jsonify(user.forAll())

#UPDATE
@app.route("/user/edit", methods=['GET', 'POST'])
def edit():
    if request.method == 'GET':
        user = User()
        return json.jsonify(user.forEdit())
    elif request.method == 'POST':
        form = UserForm(request.args)
        if not form.validate():
            return json.jsonify(errorMessages=messages)

        user = User.query.filter(User.id == form.id).first()

        user.set_password(form.password)
        db.session.commit()
        return json.jsonify(user.forAll())


#DELETE - ACTIVATE
@app.route("/user/delete", methods=['GET'])
def deleteUser():
    userId = request.args.get("id")
    user = User.query.filter(User.id == userId).first()

    user.deleted = True
    db.session.commit()
    return json.jsonify(user.forAll())


@app.route("/user/activate", methods=['GET'])
def activateUser():
    userId = request.args.get("id")
    user = User.query.filter(User.id == userId).first()

    user.deleted = False
    db.session.commit()
    return json.jsonify(user.forAll())