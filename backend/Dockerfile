FROM python:3.12.3-alpine3.19

WORKDIR /

ADD . .

ENV MONGO_DB_CONNECTION_STRING="mongodb://mongodb:27017/expense?authSource=admin"

RUN pip install -r requirements.txt

EXPOSE 8000

CMD [ "python" ,"main.py"]
