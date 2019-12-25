import os

class Config(object):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://nikola:nikola@localhost/burnin?charset=utf8'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev'