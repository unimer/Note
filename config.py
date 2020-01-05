import os
import redis
from os import environ

class Config(object):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://nikola:nikola@localhost/burnin?charset=utf8'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev'


    # Flask-Session
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis.from_url('redis://127.0.0.1:5000')
