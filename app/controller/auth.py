from app import app, login
from app.models.main import User
from flask import json, redirect, url_for, request
from flask_login import current_user, login_user, logout_user

from app.forms.UserForm import UserForm
import sys

@app.route('/login', methods=['POST'])

def login():
    # if current_user.is_authenticated:
    #     return redirect(url_for('index'))

    print(request.form, file=sys.stderr)
    form = UserForm(request.form)
    
    if form.validate():
        user = User.query.filter_by(username=form.username).first()
        if user is None:
            return json.jsonify(success="false", message="nonExistingUser")
        if not user.check_password_hash(form.password):
            return json.jsonify(success="false", message="wrongPassword")
        # login_user(user)
        print (login_user(user, remember=True), file=sys.stderr)
        print (current_user.get_id(), file=sys.stderr)


        
        return json.jsonify(success=True, message="successfull login")
    return json.jsonify(success=False, message="formDataError")


@app.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return json.jsonify(success=True, message="true")
