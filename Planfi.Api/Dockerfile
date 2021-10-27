FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base

COPY . /app
WORKDIR /app

RUN dotnet tool install --global dotnet-ef

RUN dotnet restore "Planfi.Api.csproj"

RUN dotnet build
RUN chmod +x ./dbMigration.sh
CMD /bin/bash ./dbMigration.sh


