from app.models.main import *
from app.models.enum import ColorEnum
class Lists():

    def UserList():
        return {}

    def listOrganizations():
        dictionary = {}
        dictionary[-1] = ""

        organization = Organization.query.all()
        for org in organization:
            dictionary[org.id] = org.name

        
        return dictionary

    def getColors():
        dictionary = {}
        for k,v in ColorEnum.colorsEnum:
            dictionary[k] = v
        return dictionary