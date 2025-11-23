#!/bin/bash

# Helper script to run the Slack bot with correct environment

cd "$(dirname "$0")"
export PYTHONPATH=$(pwd):$PYTHONPATH

# Ensure SSL certificates are available
export SSL_CERT_FILE=$(./venv/bin/python -c "import certifi; print(certifi.where())")

./venv/bin/python app/bot.py
