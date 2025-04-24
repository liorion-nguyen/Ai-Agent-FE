#!/bin/bash

set -e

export NEXT_PUBLIC_URL=${DEPLOY_ENV}

pm2 start ./pm2.json --no-daemon
