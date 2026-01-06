def calculate_impact(quantity_kg):
    co2_saved = quantity_kg * 1.8  # kg CO2 per kg reuse
    landfill_saved = quantity_kg * 0.9

    return {
        "waste_reused_kg": quantity_kg,
        "co2_saved_kg": round(co2_saved, 2),
        "landfill_diversion_kg": round(landfill_saved, 2)
    }
