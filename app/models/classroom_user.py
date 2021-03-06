from .db import db

"""
Defines the join table between users and classes
"""


classroom_user = db.Table(
    'classroom_user',
    db.Column('class_id', db.Integer, db.ForeignKey('classes.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('created_on', db.DateTime, server_default=db.func.now()),
    db.Column(
        'updated_on',
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )
)
