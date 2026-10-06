import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'jd8-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///jd8.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
