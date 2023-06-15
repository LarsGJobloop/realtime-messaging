#!/usr/bin/bash

CONFIG="/home/larsg/projects/realtime-messaging/backend/config/nats-server.conf"

docker run --name nats-server --rm -v $CONFIG:/nats-server.conf nats -c /nats-server.conf