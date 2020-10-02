#!/bin/sh

# this script starts a container in which the application is to be built. arguments:
# $1: TeamCity agent name.
# $2: the name of the resulting container to be used by other scripts.

set -eux

__AGENT_NAME=$(echo "$1" | tr '[:upper:]' '[:lower:]')
# that's the way to locate sources on the TC cluster.
__BUILD_DIR=/data/teamcity_agents/${__AGENT_NAME}/work/$(basename "$PWD")

docker build . --tag arctics.dev
docker run -it -d --rm --name=$2 -v ${__BUILD_DIR}:/sources arctics.dev

