from flask import Flask, jsonify, request
from socketserver import ThreadingMixIn
import ollama
from flask_cors import CORS

class ThreadedServer(ThreadingMixIn, Flask):
    pass

app = ThreadedServer(__name__)

CORS(app, supports_credentials=True, methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

system_message = "You are a helpful member of Garnier Organization which responds to the user query. You are doing dialog with the user. Try to dialog using the content given in system if user query is related to the content. Never mention that you are provided any content or something. The dialog should be SMALL as the message you generate will be used by Web Speech to dialog with the user."

user_content = "Garnier is excited to introduce its latest innovation in hair care with the launch of three new types of shampoo, each designed to cater to specific hair needs and preferences. The new line includes Garnier Pure Clean Shampoo, which offers a refreshing, deep-cleaning experience with its unique blend of natural ingredients that purify and revitalize the scalp. Garnier Hydrate & Shine Shampoo is perfect for those seeking intense moisture and shine, enriched with hydrating extracts that leave hair soft and lustrous. Lastly, Garnier Strength & Repair Shampoo focuses on fortifying and restoring damaged hair, using a powerful formula that strengthens strands from root to tip. Each shampoo combines Garnier’s commitment to quality with innovative technology to ensure that your hair looks and feels its best every day."



@app.route("/query",methods=["POST"])
def query():
    data = request.get_json()
    query = data.get("query")
    response = ollama.chat(model='llama3', options={"temperature": 0.5}, messages=[
    {
        'role': 'system',
        'content': system_message,
    },
    {
        'role': 'user',
        'content': user_content,
    },
    {
        'role': 'user',
        'content': query,
    },        
    ])

    return {"answer":response['message']['content'].replace('\n','').replace('.','')}