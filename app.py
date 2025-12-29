from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import faiss
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)
CORS(app)

# loading models
print("Loading embedding model...")
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

print("Loading generation model...")
tokenizer = AutoTokenizer.from_pretrained(
    "google/flan-t5-small", local_files_only=True
)
gen_model = AutoModelForSeq2SeqLM.from_pretrained(
    "google/flan-t5-small", local_files_only=True
)

print("Loading FAISS index...")
index = faiss.read_index("reelspark.index")

with open("reelspark_metadata.json", "r", encoding="utf-8") as f:
    metadatas = json.load(f)


FEEDBACK_FILE = "user_feedback.json"

def load_feedback():
    try:
        with open(FEEDBACK_FILE, "r") as f:
            return json.load(f)
    except:
        return []

def get_reward(doc_id, feedback):
    rewards = [f["reward"] for f in feedback if f["id"] == doc_id]
    return sum(rewards) / len(rewards) if rewards else 0.0

# api
@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    query = data.get("query", "").strip()

    if not query:
        return jsonify({"error": "Query required"}), 400

    q_emb = embed_model.encode([query], normalize_embeddings=True)

    D, I = index.search(q_emb, k=40)

    feedback = load_feedback()
    candidates = []

    SIM_WEIGHT = 0.8
    REWARD_WEIGHT = 0.2

    for sim, idx in zip(D[0], I[0]):
        doc = metadatas[idx]
        doc_id = doc.get("id", f"doc_{idx}")

        reward = get_reward(doc_id, feedback)

        score = (SIM_WEIGHT * float(sim)) + (REWARD_WEIGHT * reward)

        candidates.append({
            "id": doc_id,
            "hook": doc.get("hook", ""),
            "story": doc.get("story", ""),
            "cta": doc.get("cta", ""),
            "content_type": doc.get("content_type", "All"),
            "intent": doc.get("intent", "All"),
            "tone": doc.get("tone", "All"),
            "reward": reward,
            "score": score
        })

    # RLHF-aware reranking
    candidates.sort(key=lambda x: x["score"], reverse=True)
    top = candidates[:3]

    results = []
    for d in top:
        results.append({
            "id": d["id"],
            "hook": d["hook"],
            "story": d["story"],
            "cta": d["cta"],
            "content_type": d["content_type"],
            "intent": d["intent"],
            "tone": d["tone"],
            "confidence": round(0.6 + d["reward"], 2)
        })

    return jsonify(results)


@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.json

    record = {
        "id": data["id"],
        "reward": data["rating"] / 5.0
    }

    feedback = load_feedback()

    # overwriting previous feedback for same doc
    feedback = [f for f in feedback if f["id"] != record["id"]]
    feedback.append(record)

    with open(FEEDBACK_FILE, "w") as f:
        json.dump(feedback, f, indent=2)
    print("storint reward")

    return jsonify({"status": "feedback stored"})


@app.route("/top_content")
def top_content():
    feedback = load_feedback()
    top_ids = sorted(feedback, key=lambda x: x["reward"], reverse=True)[:10]
    results = []
    for f in top_ids:
        doc = next((d for d in metadatas if d.get("id") == f["id"]), None)
        if doc:
            results.append({
                "id": doc["id"],
                "hook": doc.get("hook", ""),
                "story": doc.get("story", ""),
                "cta": doc.get("cta", ""),
                "tone": doc.get("tone", ""),
                "reward": f["reward"]
            })
    return jsonify(results)



if __name__ == "__main__":
    app.run(debug=True)
