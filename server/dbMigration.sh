#!/bin/bash

set -e
run_cmd="dotnet run"

export PATH="$PATH:/root/.dotnet/tools"

until dotnet ef database update; do
    >&2 echo "Migrations executing"
    sleep 1
done

>&2 echo "DB Migrations complcdete, starting app."
>&2 echo "Running': $run_cmd"
exec $run_cmd