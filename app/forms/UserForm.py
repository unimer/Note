from app.helpers import str2bool
import sys
from app import db
from app.models.main import User
from app import messages


# TODO: error messages dictionary

class UserForm():
    id = ""
    username = ""
    email = ""
    password = ""
    added = ""
    organization = None
    deleted = False

    def __init__(self, args):
        self.id = args.get("id")
        self.username = args.get("username")
        self.email = args.get("email")
        self.password = args.get("password")
        self.organization = args.get("organization")
        self.deleted = str2bool(args.get('deleted'))

    def validateNew(self):
        error = False
        
        print(self.id, file=sys.stderr)
        if self.username == None:
            error = True
            messages['username'] = 'emptyField'
        if User.query.filter(User.username == self.username).first():
            error = True
            messages['username'] = 'duplicateField'

        if self.email == None:
            error = True
        
        if User.query.filter(User.email == self.email).first():
            error = True
            messages['email'] = 'duplicateField'
        
        if self.password == None:
            error = True
            messages['password'] = 'emptyField'

        return not error

    def validate(self):
        error = False
        
        
        if self.password == None:
            error = True
            messages['password'] = 'requiredField'

        return not error
