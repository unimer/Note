from app import app
from app.helpers import str2bool
from app.models.main import *
from flask import json, request
from flask_login import login_required, current_user
from app.forms.NoteForm import NoteForm
from app import messages
import sys

# CREATE
@app.route("/note/add", methods=['GET', 'POST'])
def addNote():
    if request.method == 'GET':
        note = Note()
        return json.jsonify(note.forAll())
    elif request.method == 'POST':
        form = NoteForm(request.args)
        # print(current_user, file=sys.stderr)
        if (not form.validateNew()):
            return json.jsonify(errorMessages=messages)
       
        user = User.query.filter(User.id == current_user.get_id()).first()

        note = Note()
        note.title = form.title
        note.body = form.body
        note.userId = user.id
        note.organizationId = user.organization
        note.group = form.group
        note.private = form.private
        note.color = form.color

        db.session.add(note)
        db.session.commit()
        return json.jsonify(note.forAll())

# UPDATE
@app.route("/note/pin", methods=['GET'])
def pin():
    noteId = request.args.get('id')

    pin = str2bool(request.args.get('pin')) if request.args.get('pin')  else False #ternary operator
    print(pin, file=sys.stderr)
    note = Note.query.filter(Note.id == noteId).first()
    
    note.pinned = pin
    db.session.commit() 
    return json.jsonify(note.forAll()) 

@app.route("/note/delete", methods=['GET'])
def deleteNote():
    noteId = request.args.get('id')

    delete = str2bool(request.args.get('delete')) if request.args.get('delete')  else True #ternary operator
    print(pin, file=sys.stderr)
    note = Note.query.filter(Note.id == noteId).first()
    
    note.deleted = delete
    db.session.commit() 
    return json.jsonify(note.forAll()) 


    