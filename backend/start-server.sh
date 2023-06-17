#!/usr/bin/bash

CONFIG="${PWD}/config/nats-server.conf"

docker run --name nats-server --rm -v $CONFIG:/nats-server.conf nats -c /nats-server.conf