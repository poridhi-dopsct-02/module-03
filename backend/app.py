import os
from flask import Flask, Response, request, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId

load_dotenv()

app = Flask(__name__)
mongo_db_url = os.environ.get("MONGO_DB_CONNECTION_STRING")

client = MongoClient(mongo_db_url)
db = client['expense']

@app.post("/api/expense")
def addExpense():
    requestBody = request.json
    print(requestBody)
    db.expense.insert_one(requestBody)

    resp = jsonify({"message": "Expense record added successfully"})
    resp.status_code = 200
    return resp

@app.get("/api/expense")
def get_sensors():
    expenses = list(db.expense.find())
    
    print(expenses)
    transactions = []
    totalEarning = 0
    totalExpense = 0

    for expense in expenses:
        if(float(expense["amount"])>0):
            totalEarning += expense["amount"]
        else:
            totalExpense += expense["amount"]
            
        
        transactions.append({"id": str(expense["_id"]), 
                            "title": expense["title"],
                            "amount": expense["amount"]})
    
    transactions.reverse()
    
    responseData = {
            "totalEarning": totalEarning,
            "totalExpense": totalExpense,
            "transactions" : transactions
        }


    response = Response(
        response=(dumps(responseData)), status=200,  mimetype="application/json")
    return response


@app.delete("/api/expense/<recordId>")
def removeExpense(recordId):
    if recordId == None: return {}
    
    db.expense.delete_one({"_id": ObjectId(recordId)})

    resp = jsonify({"message": "Expense record deleted successfully"})
    resp.status_code = 200
    return resp