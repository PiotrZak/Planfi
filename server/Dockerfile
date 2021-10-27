FROM mcr.microsoft.com/dotnet/sdk:5.0
COPY . /app
WORKDIR /app
RUN dotnet tool install --global dotnet-ef
RUN dotnet restore
RUN dotnet build
RUN chmod +x ./dbMigration.sh
CMD /bin/bash ./dbMigration.sh


