from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, User, WasteListing, BuyerRequirement
from matching import match_waste
from impact import calculate_impact

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///waste.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()


# ---------------- USER REGISTRATION ----------------
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    user = User(
        name=data['name'],
        role=data['role'],  # producer / buyer
        industry=data.get('industry'),
        location=data['location']
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"})

# ---------------- ADD WASTE LISTING ----------------
@app.route('/waste', methods=['POST'])
def add_waste():
    data = request.json
    waste = WasteListing(
        producer_id=data['producer_id'],
        waste_type=data['waste_type'],
        composition=data['composition'],
        quantity=data['quantity'],
        location=data['location']
    )
    db.session.add(waste)
    db.session.commit()
    return jsonify({"message": "Waste listed successfully"})

# ---------------- ADD BUYER REQUIREMENT ----------------
@app.route('/buyer', methods=['POST'])
def add_buyer():
    data = request.json
    buyer = BuyerRequirement(
        buyer_id=data['buyer_id'],
        required_material=data['required_material'],
        min_quantity=data['min_quantity'],
        location=data['location']
    )
    db.session.add(buyer)
    db.session.commit()
    return jsonify({"message": "Buyer requirement added"})

# ---------------- AI MATCHING ----------------
@app.route('/match/<int:waste_id>', methods=['GET'])
def match(waste_id):
    waste = WasteListing.query.get(waste_id)
    buyers = BuyerRequirement.query.all()

    matches = match_waste(waste, buyers)
    impact = calculate_impact(waste.quantity)

    return jsonify({
        "matches": matches,
        "impact": impact
    })

@app.route('/')
def home():
    return jsonify({
        "status": "Backend is running",
        "message": "MSME Waste Material Reuser API live"
    })


if __name__ == '__main__':
    app.run(debug=True)
