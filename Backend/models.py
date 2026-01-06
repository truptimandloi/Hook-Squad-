from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    role = db.Column(db.String(20))  # producer / buyer
    industry = db.Column(db.String(100))
    location = db.Column(db.String(100))

class WasteListing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    producer_id = db.Column(db.Integer)
    waste_type = db.Column(db.String(100))
    composition = db.Column(db.String(200))
    quantity = db.Column(db.Float)
    location = db.Column(db.String(100))

class BuyerRequirement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer)
    required_material = db.Column(db.String(100))
    min_quantity = db.Column(db.Float)
    location = db.Column(db.String(100))
