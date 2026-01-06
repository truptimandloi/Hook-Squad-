from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def match_waste(waste, buyers):
    results = []

    documents = [waste.waste_type + " " + waste.composition]
    buyer_docs = [b.required_material for b in buyers]

    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform(documents + buyer_docs)

    waste_vec = tfidf[0]
    buyer_vecs = tfidf[1:]

    similarities = cosine_similarity(waste_vec, buyer_vecs)[0]

    for buyer, sim in zip(buyers, similarities):
        quantity_score = 1 if waste.quantity >= buyer.min_quantity else 0
        location_score = 1 if waste.location == buyer.location else 0

        final_score = (
            0.6 * sim +
            0.25 * quantity_score +
            0.15 * location_score
        )

        if final_score > 0.3:
            results.append({
                "buyer_id": buyer.buyer_id,
                "required_material": buyer.required_material,
                "match_score": round(final_score * 100, 2)
            })

    results.sort(key=lambda x: x['match_score'], reverse=True)
    return results[:5]
