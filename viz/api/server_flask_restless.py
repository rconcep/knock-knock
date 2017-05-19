import flask
import flask.ext.sqlalchemy
import flask.ext.restless
from flask.ext.cors import CORS

# Create the Flask application and the Flask-SQLAlchemy object
app = flask.Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nobel_winners.db'

app.config['CORS_ALLOW_HEADERS'] = 'Content-Type'
app.config['CORS_RESOURCES'] = {r"/api/*": {"origins": "*"}}

db = flask.ext.sqlalchemy.SQLAlchemy(app)

# Create your Flask-SQLAlchemy models as usual but with the following two (reasonable) restrictions:
# 1. They must have a primary key column of type sqlalchemy.Integer or type sqlalchemy.Unicode.
# 2. They must have an __init__ method which accepts keyword arguments for all columns (the constructor in flask.ext.sqlalchemy.SQLAlchemy.Model supplies
#    such a method, so you don't need to declare a new one).
class Winners(db.Model):
    __tablename__ = 'winners'
    index = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    category = db.Column(db.Unicode)
    year = db.Column(db.Unicode)
    country = db.Column(db.Unicode)
    gender = db.Column(db.Unicode)
    
# Create the database tables
db.create_all()

# Create the Flask-Restless API manager
manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

# Create the API endpoints, which will be available at /api/<tablename> by default
# Allowed HTTP methods can be specified as well
manager.create_api(Winners, methods=['GET'], max_results_per_page=1000)

cors = CORS(app)

# Start the flask loop
app.run()