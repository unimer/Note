from app import app
from app import validationJsonErrorResponse
from app.helpers import str2bool, adaptor
from app.models.main import *
from app.models.lists import Lists
from app.models.enum import ColorEnum
from flask import json, request
from flask_login import login_required, current_user
from app.forms.NoteForm import NoteForm
from app import messages
from datetime import datetime

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
            return validationJsonErrorResponse()
       
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

@app.route("/note/edit", methods=['GET', 'POST'])
# @login_required
def editNote():
    if request.method == 'GET':
        noteId = request.args.get('id')
        note = Note.query.filter(Note.id == noteId).first()
        return json.jsonify(note.forAll())
    elif request.method == 'POST':
        noteId = request.args.get('id')
        form = NoteForm(request.form)

        if not form.validate():
            return validationJsonErrorResponse()
        note = Note.query.filter(Note.id == noteId).first()
        noteOldGroup = adaptor(note.group)
        
        currentUserId = int(current_user.get_id())
        
        print(noteOldGroup[3], file=sys.stderr)
        if (currentUserId in noteOldGroup) or (currentUserId == note.userId):
            note.group = form.group
            note.title = form.title
            note.body = form.body
            note.color = form.color
            note.private = form.private
            note.changed = datetime.utcnow()
            db.session.commit()
            return json.jsonify(note.forAll())
        else:
            return json.jsonify(unauthorized="true")

@app.route("/note/getOrganization", methods=['GET'])
def getOrganization():
    organs = Lists.listOrganizations()
    # print(organs, file=sys.stderr)
    return json.jsonify([Organization.forSelect(key=organKey, val=organValue) for organKey, organValue in organs.items()])

@app.route("/note/getColors", methods=['GET'])
def getColors():
    colors = Lists.getColors()
    return json.jsonify([ColorEnum.forSelect(key, value) for key, value in colors.items()])


# Filter
@app.route("/note/index", methods=['GET'])
def noteIndex():
    username = request.args.get('username')
    organization = request.args.get('organization')
    color = request.args.get('color')
    title = request.args.get('title')
    body = request.args.get('body')
    dateAdded = request.args.get('dateAdded')

    notes = Note.query.all()

    if username:
        user = User.query.filter(User.username == username).first()
        if user:
            userId = user.id
            notes = filter(lambda item: item.userId == userId, notes)
        else:
            notes = {}  

    if organization: # It will get organization id via combobox
        notes = filter(lambda item: item.organizationId == int(organization), notes)

    if dateAdded:
        notes = filter(lambda item: item.added == dateAdded, notes)

    if body:
        notes = filter(lambda item: item.body.find(body) >= 0, notes)
    
    if title:
        notes = filter(lambda item: item.title.find(title) >= 0, notes)

    
    if color:
        notes = filter(lambda item: item.color == int(color), notes)



    return json.jsonify([note.forAll() for note in notes])