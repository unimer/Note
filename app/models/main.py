from app import db, login
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import sys

@login.user_loader
def load_user(id):
    user = User.query.get(int(id))
    print("helloUser", file=sys.stderr)
    print(user, file=sys.stderr)
    return user



class User(UserMixin, db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), index=True, unique=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(128))
    added = db.Column(db.DateTime, default=datetime.utcnow)
    organization = db.Column(db.Integer, db.ForeignKey('organization.id'))
    notes = db.relationship('Note', backref="author", lazy='dynamic')
    deleted = db.Column(db.Boolean(), default=False)


    def forAll(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'added' : self.added, 
            'organization': self.organization,
            'deleted': self.deleted
        }

    def forEdit(self):
        return {
            'password': ""
        }

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password_hash(self, password):
        return check_password_hash(self.password, password)

class Note(db.Model):
    __tablename__ = 'note'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20))
    body = db.Column(db.String(90))
    added = db.Column(db.DateTime, default=datetime.utcnow)
    changed = db.Column(db.DateTime, default=datetime.utcnow)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    organizationId = db.Column(db.Integer, db.ForeignKey('organization.id'))
    group = db.Column(db.String(128))
    deleted = db.Column(db.Boolean(), default=False)
    private = db.Column(db.Boolean(), default=False)
    color = db.Column(db.Integer)
    pinned = db.Column(db.Boolean(), default=False)

    def forAll(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'added': self.added,
            'changed': self.changed,
            'userId': self.userId,
            'organizationId': Organization.query.filter_by(id = self.organizationId).first().name,
            'group': self.group,
            'deleted': self.deleted,
            'private': self.private,
            'color': self.color,
            'pinned': self.pinned
        }


class Organization(db.Model):
    __tablename__ = 'organization'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), index=True, unique=True)
    added = db.Column(db.DateTime, default=datetime.utcnow)
    deleted = db.Column(db.Boolean(), default=False)
    notes = db.relationship('Note', backref='organization', lazy='dynamic')
    users = db.relationship('User', backref='users', lazy='dynamic')

    def forAll(self):
        return {
            'id': self.id,
            'name': self.name,
            'added': self.added,
            'deleted': self.deleted
        }

    def forSelect(key, val):
        return {
            'key': key,
            'value': val
            }