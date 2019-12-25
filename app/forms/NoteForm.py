from app.helpers import str2bool
import sys
from app import db
from app.models.main import Note
from app import messages


class NoteForm():

    title=""
    body =""
    group=""
    private = False
    color = 0

    def __init__(self, args):
        self.title = args.get('title')
        self.body = args.get('body')
        self.group = args.get('group')
        self.private = args.get('private')
        self.color = args.get('color')

    def validateNew(self):
        error = False

        if self.title == None or self.title == "":
            error = True
            messages['title'] = 'emptyTitle'

        if Note.query.filter(Note.title == self.title).first():
            error = True
            messages['title'] = 'duplicateField'

        return not error


    def validate(self):
        error = False

        if self.title == None or self.title == "":
            error = True
            messages['title'] = 'emptyTitle'

        if Note.query.filter(Note.title == self.title).first():
            error = True
            messages['title'] = 'duplicateField'

        return not error