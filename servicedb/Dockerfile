FROM python:3.11

WORKDIR /servicedb

COPY requirements.txt /servicedb/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /servicedb/requirements.txt

COPY . /servicedb/