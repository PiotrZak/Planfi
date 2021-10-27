FROM mcr.microsoft.com/dotnet/sdk:5.0

COPY . /app
WORKDIR /app
FROM mcr.microsoft.com/dotnet/sdk:5.0.102-ca-patch-buster-slim AS build

COPY ["/Planfi.Api/.", "./Planfi.Api/"]
RUN dotnet restore "Planfi.Api/WebApi.csproj"
RUN dotnet build "Planfi.Api/WebApi.csproj" -c Release -o /app/build
FROM build AS publish
RUN dotnet publish "Planfi.Api/WebApi.csproj" -c Release -o /app/publish

COPY --from=publish /app/publish . *host.json ./
ENTRYPOINT ["dotnet", "WebApi.dll"]

# RUN dotnet tool install --global dotnet-ef
# RUN chmod +x Planfi.Api/dbMigration.sh
# CMD /bin/bash Planfi.Api/dbMigration.sh


