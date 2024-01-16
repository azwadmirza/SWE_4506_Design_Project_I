FROM python:3.12

COPY requirements.txt requirements.txt

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

COPY . code
WORKDIR /code

EXPOSE 8080

CMD ["gunicorn", "server.wsgi:application", "--bind", "0.0.0.0:8080"]