## Owerview
This project comes as a part of Distributed Systems subject at Computer Science postgraduate studies. The main goal of this project is to develop a real life distributed system, from idea to ralization, and meet us practically with technologies we discussed.

## Install
### On Linux 
1. clone repository to local directory
2. navigate to cloned directory: `cd <directory>/Note`
3. create python virtual environment
`python3 -m venv venv`
4. activate virtual environment
`source venv/bin/activate`
5. install required python modules from requirements file
`sudo pip3 install -r requirements.txt`

### Run FLASK server
`export FLASK_APP=postit.py`
If you want to run the server in debug mode:
`export FLASK_DEBUG=true`
Run the server
`flask run`

Application should be available on `localhost:5000`