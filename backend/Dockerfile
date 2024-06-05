FROM python:3.8-alpine

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

# Get envs using .env files in docker-compose.yml
ENV MONGO_DB_CONNECTION_STRING="mongodb://mongodb:27017/expense?authSource=admin"
ENV APP_PORT=8000

COPY . .

EXPOSE 8000

CMD [ "python" ,"./main.py"]
