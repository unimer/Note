from app import app, login
from app.models.main import User
from flask import json, redirect, url_for, request
from flask_login import current_user, login_user
from app.forms.UserForm import UserForm
import sys

@app.route('/login', methods=['POST'])
def login():
    # if current_user.is_authenticated:
    #     return redirect(url_for('index'))
    form = UserForm(request.args)
    
    if form.validate():
        print('This is error output', file=sys.stderr)
        user = User.query.filter_by(username=form.username).first()
        if user is None:
            return json.jsonify(success="false", message="nonExistingUser")
        if not user.check_password_hash(form.password):
            return json.jsonify(success="false", message="wrongPassword")
       
        login_user(user)
        
        return json.jsonify(success="true", message="successfull login")
    return json.jsonify(success="false", message="formDataError")


@app.route('/logout', methods=['POST'])
def logout():
    return json.jsonify(todo="Logout func")
