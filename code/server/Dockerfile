FROM python:3.12

COPY requirements.txt requirements.txt

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

COPY . code
WORKDIR /code

EXPOSE 8080

ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "8080"]