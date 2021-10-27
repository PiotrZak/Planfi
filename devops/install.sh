#!/bin/bash

ROOT_DIR="/root"
GITHUB_USER="PlanfiBot"
GITHUB_PASSWORD="dewfgW35E"

cd ${ROOT_DIR}

if [ -d "$ROOT_DIR/server" ]; then
        rm -r server
fi

if [ -d "$ROOT_DIR/front" ]; then
        rm -r front
fi

git clone https://$GITHUB_USER:$GITHUB_PASSWORD@github.com/PiotrZak/Planfi.git

mv Planfi/server ${ROOT_DIR}
mv Planfi/front ${ROOT_DIR}

rm -r ${ROOT_DIR}/Planfi



