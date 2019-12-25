from app import app
from app.models.main import *
from flask import json, request
from flask_login import login_required
from app.forms.NoteForm import NoteForm
from app import messages
import sys

@app.route("/note/add", methods=['GET', 'POST'])
def addNote():
    if request.method == 'GET':
        note = Note()
        return json.jsonify(note.forAll())
    elif request.method == 'POST':
        form = NoteForm(request.args)
        if (not form.validateNew()):
            return json.jsonify(errorMessages=messages)
       
        note = Note()
        note.title = form.title
        note.body = form.body
        # note.userId = form.userId
        # note.institutionId = form.institutionId

        db.session.add(note)
        db.session.commit()
        return json.jsonify(note.forAll())