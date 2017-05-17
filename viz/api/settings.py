# Optional MONGO variables
MONGO_HOST = 'localhost'
MONGO_PORT = 27017
#MONGO_USERNAME = 'user'
#MONGO_PASSWORD = 'user'

URL_PREFIX = 'api'
MONGO_DBNAME = 'nobel_prize'
DOMAIN = {'winners_full': {
    'schema': {
        'country': {'type': 'string'},
        'category': {'type': 'string'},
        'name': {'type': 'string'},
        'year': {'type': 'integer'},
        'gender': {'type': 'string'},
        'mini_bio': {'type': 'string'},
        'bio_image': {'type': 'string'}
    },
    'url': 'winners'
}}

X_DOMAINS = 'http://localhost:8080'
HATEAOS = False
PAGINATION = False