FROM python:3.12.3-alpine3.19

WORKDIR /

ADD . .

ENV MONGO_DB_CONNECTION_STRING="mongodb://localhost:27017/expense"

RUN pip install -r requirements.txt

EXPOSE 8000

CMD [ "python" ,"main.py"]
