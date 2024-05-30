FROM python:3.6.8-alpine3.9

WORKDIR /

ADD . .

RUN pip install pipenv --break-system-packages

RUN pipenv install

RUN pipenv shell

EXPOSE 8000

CMD [ "python" ,"main.py"]
