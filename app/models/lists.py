from app.models.main import *

class Lists():

    def UserList():
        return {}

    def ListOrganizations():
        dictionary = {}

        organization = Organization.query.all()
        for org in organization:
            dictionary[org.id] = org.name
        
        return dictionary