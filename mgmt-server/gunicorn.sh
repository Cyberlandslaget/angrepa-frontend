#!/bin/sh
gunicorn --workers=1 -k eventlet -b 0.0.0.0:5000 app:app