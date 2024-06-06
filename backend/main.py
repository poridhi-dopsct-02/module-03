import os
from flask import Flask, Response, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

app_port = os.environ.get("APP_PORT")
mongo_db_url = os.environ.get("MONGO_DB_CONNECTION_STRING")
client = MongoClient(mongo_db_url)
db = client["expense"]


@app.get("/api/health")
def health():
    resp = jsonify({"message": "OK"})
    resp.status_code = 200
    return resp


@app.post("/api/expense")
@cross_origin()
def addExpense():
    requestBody = request.json
    print(requestBody)
    db.expense.insert_one(requestBody)

    resp = jsonify({"message": "Expense record added successfully"})
    resp.status_code = 200
    return resp


@app.get("/api/expense")
@cross_origin()
def get_expenses():
    expenses = list(db.expense.find())

    print(expenses)
    transactions = []
    totalIncome = 0
    totalExpense = 0

    for expense in expenses:
        if float(expense["amount"]) > 0:
            totalIncome += expense["amount"]
        else:
            totalExpense += expense["amount"]

        transactions.append(
            {
                "id": str(expense["_id"]),
                "title": expense["title"],
                "amount": expense["amount"],
            }
        )

    transactions.reverse()

    responseData = {
        "totalIncome": totalIncome,
        "totalExpense": totalExpense,
        "transactions": transactions,
    }

    response = Response(
        response=(dumps(responseData)), status=200, mimetype="application/json"
    )
    return response


@app.delete("/api/expense/<recordId>")
@cross_origin()
def removeExpense(recordId):
    if recordId == None:
        return {}

    db.expense.delete_one({"_id": ObjectId(recordId)})

    resp = jsonify({"message": "Expense record deleted successfully"})
    resp.status_code = 200
    return resp


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=app_port)
