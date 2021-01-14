#!/usr/bin/env bash
export FLASK_APP=application.py
export DATABASE_URL=postgres://snphfdxowxvhjz:839754d88480633f8be707f0a1be801a65128920cd638a250dc31774b9b61b42@ec2-52-205-145-201.compute-1.amazonaws.com:5432/d3rf50im1s4e1i
flask run --port $PORT --host=$IP