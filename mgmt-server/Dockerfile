FROM python:3.10-slim-buster

RUN useradd -m app

WORKDIR /app

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

ENTRYPOINT ["python3", "app.py"]